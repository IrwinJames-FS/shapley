import { BiValueCommandChars } from "../../dist/types";
import Command, { CommandArguments, compPoint, isAbsolute, isClosingChar, isCommandChar, l, L, M, Q } from "./Commands";
import Gen, { GeneratorList } from "./Gen";
import { Bounds, Point } from "./types";
import { add, allConnected, angleTo, polygon, pt, ray, rollingThree, stride } from "./utils";

export type Dgen = GeneratorList<Command>;
/**
 * D is a interactive representation of the information provided in the d property of a path.
 */
class D extends Gen<Command> {
	/*
	Populated during iteration
	*/
	firstPosition?: Point
	currentPosition?: Point
	bounds: Bounds = [0,0,0,0,0,0];
	margin: number = 0;
	_aspectRatio?: string
	
	get viewBox(){
		const [mx, my, width, height] = this.bounds;
		const m = this.margin*2
		return `${mx-this.margin} ${my-this.margin} ${width+m} ${height+m}`;
	}

	get aspectRatio(){
		if(this._aspectRatio) return this._aspectRatio;
		
		return `${this.bounds[2]} / ${this.bounds[3]}`;
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
	constructor(args: string | number[] | Command[] | GeneratorList<Command> | CommandArguments<BiValueCommandChars>, margin: number = 0){
		const gen = typeof args === 'string' ? D.parse(args)
		: typeof args === 'function' ? D.standardizeGenerator(args)
		: Array.isArray(args) 
		? typeof args[0] === 'number' ? D.fromLines(args as number[])
		: args[0] instanceof Command ? function*(){ yield* args as Command[]; }
		: function*(){} : function*(){}
		
		super(gen as GeneratorList<Command>);
		this.margin = margin;
	}

	setMargin(margin: number){
		this.margin = margin;
		return this;
	}
	/**
	 * in some circumstances such as converting to objectBounding a measurement needs to be forced. the simplest way to complish this is to convert the class to a string and then observe the bounds. 
	 * 
	 */
	getBounds(){
		if(Math.max(...this.bounds) > 0) return this.bounds;
		//by forcing all of the instances to iterate we can force a measurement prior to render.
		const _ = ''+this;
		return this.bounds;
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
		this.currentPosition = undefined;
	}

	/**
	 * Translate the path
	 * 
	 * this will only translate Absolute commands and an the first m character provided.
	 * @param x 
	 * @param y 
	 */
	translate(x: number, y: number){
		return this.apply(gen=>function*(){
			let first = true;
			for(const cmd of gen()){
				if(!first && !isAbsolute(cmd.fn)) {
					yield cmd;
					continue;
				}
				first = false;
				yield cmd.translate(x, y);
				
			}
		});
	}

	scale(x: number, y: number){
		return this.apply(gen=>function*(){
			for(const cmd of gen()){
				yield cmd.scale(x,y);
			}
		});
	}

	/**
	 * Converts a command path to objectBounding units. this is particularly helpful if the path is being used as a background or clip path. 
	 * 
	 * To this results in a non linear scaling method forcing the units into a square. to maintain a non square rectangle it is recomended you set an aspect ratio. 
	 * 
	 */
	toObjectBounding(){
		const [mx,my,width, height] = this.getBounds();
		if(mx === 0 && my === 0 && width === 1 && height === 1) return this; //no need to do any math its already normalized.
		this._aspectRatio = this.aspectRatio;
		const sx = 1/width;
		const sy = 1/height;
		const tx = mx*sx*-1;
		const ty = my*sy*-1;
		return this.scale(sx, sy) //scale the component down to a 1x1
		.translate(tx,ty) //move top left to (0,0);
		.flatten(); //work from a normalized point
	}

	toString(){
		let str = '';
		for(const cmd of this.each()){
			str += ' '+cmd;
		}
		return str.trim();
	}

	static standardizeGenerator(gen: GeneratorList<Command> | CommandArguments<BiValueCommandChars>){
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
		console.log(sides, radius);
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
			yield new Command("z");
		})
	}

	/**
	 * Iterates over each point and rounds vertex points. 
	 * 
	 * This method expects the first point to be exact then all subsequent points to be relative
	 * @param cornerRadius 
	 * @param points 
	 */
	static rounded(cornerRadius: number, d: readonly number[]){
		return new D(function*(){
			if(d.length < 6){
				yield M(...pt(d,0));
				if(d.length > 2) yield l(...d.slice(2));
				return;
			}

			let previous = pt(d,0);
			
			yield M(...previous);
			
			let current = add(previous, pt(d,2));

			for(let i = 4; i<d.length; i+=2){
				const pa = angleTo(current, previous);
				const start = ray(cornerRadius, pa, current);
				yield L(...start);
				const next = add(current, pt(d,i));
				const na = angleTo(current, next);
				const end = ray(cornerRadius, na, current);
				yield Q(...current, ...end)
				previous = current;
				current = next;
			}
			yield L(...current);
		});
	}
}
export default D;