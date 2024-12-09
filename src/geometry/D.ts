import Command, { Cmd, CmdArgs, CommandArguments, CommandChar, CommandLength, getCommandLength, isCommandChar } from "./Command";
import Gen, { GeneratorList } from "./Gen";
import { stride } from "./utils";

export type Dgen = GeneratorList<Cmd>;
const COMMAND_CHARS = /[ZzHhVvMmLlTtSsQqCcAa]/g
/**
 * D is a interactive representation of the information provided in the d property of a path.
 */
class D extends Gen<Cmd> {
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
		if(typeof args === 'string'){
			super(D.parse(args));
			return;
		} else if (typeof args === 'function'){
			super(args);
			return;
		}
		if(Array.isArray(args)){
			if(typeof args[0] === 'number'){
				super(function*(){
					yield new Command("M", function*(){yield* stride(args as number[], 2)});
					yield new Command("z");
				});
				return;
			} else if (args[0] instanceof Command){
				super(function*(){
					yield* args as Cmd[];
				})
				return;
			}
		}
		console.warn("Unsupported type recieved", args);
		super(function*(){});
		
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
			let char: CommandChar = "M";
			for(let i = 0; i<d.length;i++){
				if(isCommandChar(d[i])){
					char = d[i] as CommandChar;
					yield Command.parse(d, i)
				}
			}
		}
	}
}
export default D;