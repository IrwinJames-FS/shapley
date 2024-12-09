import Command, { Cmd, CommandChar, compPoint, isClosingChar, isCommandChar } from "./Command";
import Gen, { GeneratorList } from "./Gen";
import { Bounds, Point } from "./types";
import { stride } from "./utils";

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

	get viewBox(){
		return `${this.bounds.slice(0, 4).join(' ')}`;
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
	constructor(args: string | number[] | Cmd[] | GeneratorList<Cmd>){
		const gen = typeof args === 'string' ? D.parse(args)
		: typeof args === 'function' ? args
		: Array.isArray(args) 
		? typeof args[0] === 'number' ? D.fromLines(args as number[])
		: args[0] instanceof Command ? function*(){ yield* args as Cmd[]; }
		: function*(){} : function*(){}
		
		super(gen);
		
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
}
export default D;