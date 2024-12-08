import Command, { Cmd, CmdArgs, CommandArguments, CommandChar, CommandLength, getCommandLength } from "./Command";
import Gen, { GeneratorList } from "./Gen";

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
	 * @param args 
	 */
	constructor(args: string | number[] | Cmd[] | GeneratorList<Cmd>){
		if(typeof args === 'string'){
			super(D.parse(args));
			return;
		}
		super(function*(){});
		
	}

	toString(){
		let str = '';
		for(const cmd of this.each()){
			console.log(cmd);
			str += ' '+cmd;
		}
		return str.trim();
	}

	static parse(d: string){
		return function*(){
			let char: CommandChar = 'M',
			cmdLen: number = 2,
			args: number[] = [],
			currentValue: string = ''
			for(let i = 0; i<d.length;i++){
				
				//check if a command char is used... dont restate redundant commands
				if (COMMAND_CHARS.test(d[i]) && d[i] !== char) {
					char = d[i] as CommandChar;
					cmdLen = getCommandLength(char);
					args = [];
				} else if(/[\s,]/.test(d[i])){ //spaces and commas will be used as delimiters
					args.push(assertFloat(currentValue));
					currentValue = '';
					if(args.length === cmdLen){
						yield new Command(char, )
					}
				} else {
					currentValue += d[i];
				}
			}
		}
	}
}
export default D;

/**
 * Force a value to a float or throw an error
 * @param str 
 */
export const assertFloat = (str: string) => {
	const v = parseFloat(str);
	if(isNaN(v)) throw new Error(`Invalid argument provided: "${str}"`);
	return v;
}
export const fromArray = (args: number[]): CommandArguments<CommandChar> => function*(){
	if(args.length % 2) throw new Error("Invalid argument length");
	for(let i = 0; i<args.length; i+=2){
		yield [args[i], args[i+1]];
	}
}

/**
 * Parses values until another command character is detected.
 * @param d 
 */
export const parseCommandArgs = <T extends CommandChar>(char: T, d: string):CommandArguments<T>=>function*(){
	let values: number[] = [];
	let value: string = '';
	const argLength = getCommandLength(char);
	//move through the string as command argument instances are completed.
	for(let i = 0; i<d.length; i++){
		if(/[\s,]/.test(d[i])) {
			if(!value) continue;
			const v = parseFloat(value);
			if(isNaN(v)) throw new Error("Unsupported type: currently only numeric arguments are supported.");
			values.push(v);
			if(values.length === argLength){
				yield [...values] as CmdArgs<T>
				values = [];
				value = '';
			}
			continue;
		}
		value += d[i];
	}
	if(value){
		const v = parseFloat(value);
		if(isNaN(v)) throw new Error("Unsupported type: currently only numeric arguments are supported.");
		values.push(v);
		if(values.length === argLength){
			yield [...values] as CmdArgs<T>
		} else throw new Error(`Incomplete command argument: expected: ${argLength} received: ${values.length}, ${values}`);
	}
}
