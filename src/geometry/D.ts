import { BiValueCommandChars } from "../../dist/types";
import Command, { Cmd, CommandArguments, CommandChar, compPoint, isClosingChar, isCommandChar } from "./Command";
import { CIRCLE } from "./constants";
import Gen, { GeneratorList } from "./Gen";
import { Bounds, Point } from "./types";
import { allConnected, angleTo, info, polygon, ray, rollingThree, stride } from "./utils";

export type Dgen = GeneratorList<Cmd>;
/**
 * D is a interactive representation of the information provided in the d property of a path.
 */
class D extends Gen<Cmd> {
	/*
	Populated during iteration
	*/
	firstPosition?: Point
	currentPosition?: Point
	bounds: Bounds = [0,0,0,0,0,0];
	margin: number = 10;
	get viewBox(){
		const [mx, my, width, height] = this.bounds;
		const m = this.margin*2
		return `${mx-this.margin} ${my-this.margin} ${width+m} ${height+m}`;
	}
	/**
	 * D can be initialized with a string which parses and builds the generator from the string. The string will be parsed on command so data is not duplicated in memory unecessarily.
	 * 
	 * D can also be initialized using an array of numbers. If said method is provided every two numbers will be used as points to make a shape. This will simply prefix the numbers with an M and conclud with a z. 
	 * 
	 * D can be initialized with an array of command types
	 * 
	 * and finally D can be initalized with a Generator function the yields command Types. 
	 * 
	 * Allowing a wide range of sources allows D to operate in a large variety use cases.
	 * @param args 
	 */
	constructor(args: string | number[] | Cmd[] | GeneratorList<Cmd> | CommandArguments<BiValueCommandChars>){
		const gen = typeof args === 'string' ? D.parse(args)
		: typeof args === 'function' ? D.standardizeGenerator(args)
		: Array.isArray(args) 
		? typeof args[0] === 'number' ? D.fromLines(args as number[])
		: args[0] instanceof Command ? function*(){ yield* args as Cmd[]; }
		: function*(){} : function*(){}
		
		super(gen as GeneratorList<Cmd>);
	}

	*each(){
		let min: Point | undefined
		let max: Point | undefined

		for(const cmd of super.each()){
			cmd.currentPosition = this.currentPosition;
			yield cmd;
			if(!this.firstPosition) this.firstPosition = cmd.firstPosition;
			if(isClosingChar(cmd.fn)){
				this.currentPosition = this.firstPosition;
				this.firstPosition = undefined; //close the shape and start new 
			} else {
				this.currentPosition = cmd.finalPosition
			}
			min = compPoint(Math.min, cmd.min, min);
			max = compPoint(Math.max, cmd.max, max);
		}
		if(!min || !max){ 
			this.bounds = [0,0,0,0,0,0];
			return;
		}
		this.bounds = [...min, ...max.map((v,i)=>v-min[i]), ...max] as Bounds;
	}

	toString(){
		let str = '';
		for(const cmd of this.each()){
			str += ' '+cmd;
		}
		return str.trim();
	}

	static standardizeGenerator(gen: GeneratorList<Cmd> | CommandArguments<BiValueCommandChars>){
		//check the first for value.. types cannot be mixed. 
		const g = gen().next().value;
		if(!g) return function*(){};
		if(g instanceof Command) return gen;
		if(Array.isArray(g) && g.length === 2) return function*(){
			yield new Command("M", gen as CommandArguments<BiValueCommandChars>);
			yield new Command("z")
		}
	}

	/**
	 * Parse the d path 
	 * @param d 
	 * @returns 
	 */
	static parse(d: string){
		return function*(){
			for(let i = 0; i<d.length;i++){
				if(isCommandChar(d[i])){
					yield Command.parse(d, i)
				}
			}
		}
	}

	static fromLines(d: number[]){
		return function*(){
			yield new Command("M", function*(){yield* stride(d, 2)});
			yield new Command("z");
		}
	}

	/**
	 * 
	 * @param sides 
	 * @param radius 
	 * @param center 
	 * @param rotation - in angles
	 * @param cornerRadius 
	 * @param connectAll 
	 * @returns 
	 */
	static polygon(sides: number, radius: number = 1, center:Point = [0,0], rotation: number=0, cornerRadius: number=0, connectAll: boolean = false){
		const r = rotation * Math.PI/180;
		return connectAll ? new D(allConnected(polygon(sides, radius, center, r))):D.shape(cornerRadius, polygon(sides, radius, center, r))
			
	}

	

	
	/**
	 * Creates a point using a limited command spec however allows for corner rounding and shorhand notation
	 * @param cornerRadius
	 * @param points 
	 */
	static shape(cornerRadius: number, points: CommandArguments<BiValueCommandChars> | number[]){
		if(!cornerRadius) return new D(points);
		//there is a corner radius
		
		return new D(function*(){
			const gen = Array.isArray(points) ? stride(points, 2):points();
			let isPlaced = false;
			for(const r3 of rollingThree(gen)){
				if(r3.length !== 3) return yield new Command("M", function*(){yield* r3}); //just pass the stuff through as lines
				const [p,c,n] = r3;
				const pa = angleTo(c,p);
				const na = angleTo(c,n);
				yield new Command(isPlaced ? "L":"M", function*(){
					yield ray(cornerRadius, pa, c);
				});
				isPlaced = true;
				yield new Command("S", function*(){
					yield [...c, ...ray(cornerRadius, na, c)];
				});
			}
		})
	}
}
export default D;