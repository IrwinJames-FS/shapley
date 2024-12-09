
//First declaring the types then I'll declare a value representation as well

import { MAX_NUMERIC_CHAR_CODE, MIN_NUMERIC_CHAR_CODE, PERIOD_CHAR_CODE } from "./constants";
import Gen from "./Gen";

export type ClosingCommandChar = "Z" | "z";

export type SingleCommandChar = "H" | "h" | "V" | "v";

export type BiCommandChar = "M" | "m" | "L" | "l" | "T" | "t";

export type QuadCommandChar = "S" | "s" | "Q" | "q";

export type HexCommandChar = "C" | "c";

export type ArcCommandChar = "A" | "a";

export type CommandChar = ClosingCommandChar | SingleCommandChar | BiCommandChar | QuadCommandChar | HexCommandChar | ArcCommandChar;

export type CommandLength<T extends CommandChar> = T extends ClosingCommandChar ? 0
: T extends SingleCommandChar ? 1
: T extends BiCommandChar ? 2
: T extends QuadCommandChar ? 4
: T extends HexCommandChar ? 6
: 7;



export type CmdArgs<T extends CommandChar> = T extends ClosingCommandChar ? []
: T extends SingleCommandChar ? [number]
: T extends BiCommandChar ? [number, number]
: T extends QuadCommandChar ? [number, number, number, number]
: T extends HexCommandChar ? [number, number, number, number, number, number]
: [number, number, number, number, number, number, number]

export type CommandArguments<T extends CommandChar> = ()=>Generator<CmdArgs<T>>;

export type Cmd = Command<CommandChar>;

/**
 * Checks if a character is a capital or lowercase variation by examining char code.
 * @param c 
 * @param x 
 * @returns 
 */
export const isChar = <T extends CommandChar>(c: string, x: T): c is T => {
	const a = c.charCodeAt(0);
	const b = x.charCodeAt(0);
	return a === b 
	|| (a>b ? a-32:a+32) === b;
}

/**
 * Check if character is acceptible in a number.
 * @param c 
 * @returns 
 */
export const isNumeric = (c: string)=>{
	const cd = c.charCodeAt(0);
	return (cd >= MIN_NUMERIC_CHAR_CODE && cd <= MAX_NUMERIC_CHAR_CODE) || cd === PERIOD_CHAR_CODE;
}

export const isClosingChar = (s:string):s is ClosingCommandChar => isChar(s, "z");
export const isSingleChar = (s: string): s is SingleCommandChar => isChar(s, "h") || isChar(s,"v");
export const isBiChar = (s: string): s is BiCommandChar => isChar(s, "m") || isChar(s, "l") || isChar(s, "t");
export const isQuadChar = (s: string): s is QuadCommandChar => isChar(s, "s") || isChar(s, "q");
export const isHexChar = (s: string): s is HexCommandChar => isChar(s, "c");
export const isArcChar = (s: string): s is ArcCommandChar => isChar(s, "a");

export const isCommandChar = (s: string): s is CommandChar => isClosingChar(s)
|| isSingleChar(s)
|| isBiChar(s)
|| isQuadChar(s)
|| isHexChar(s)
|| isArcChar(s);


/**
 * Based on the command char the length can be determined
 * @param char 
 * @returns 
 */
export const getCommandLength = <T extends CommandChar>(char: T): CommandLength<T> => (isClosingChar(char) ? 0
: isSingleChar(char) ? 1
: isBiChar(char) ? 2
: isQuadChar(char) ? 4
: isHexChar(char) ? 6
: 7) as CommandLength<T>;



class Command<T extends CommandChar> extends Gen<CmdArgs<T>> {
	fn: T
	len: CommandLength<T>

	constructor(fn: T, values: CommandArguments<T>=function*(){}){
		super(values);
		this.fn = fn;
		this.len = getCommandLength(fn);
	}

	*each(){
		for(const n of super.each()){
			if(n.length !== this.len) throw new Error("Invalid argument length");
			yield n;
		}
	}
	toString(){
		let str: string = this.fn;
		for(const n of this.each()){
			switch (this.len){
				case 1: 
					str += ` ${n[0]}`;
					break;
				case 2:
					str += ` ${n[0]},${n[1]}`;
					break;
				case 4:
					str += ` ${n[0]},${n[1]} ${n[2]},${n[3]}`;
					break;
				case 6:
					str += ` ${n[0]},${n[1]} ${n[2]},${n[3]} ${n[4]},${n[5]}`;
					break;
				case 7:
					str += ` ${n[0]} ${n[1]} ${n[2]} ${n[3]} ${n[4]} ${n[5]},${n[6]}`;
					break
			}
		}
		return str;
	}

	/** Parse the next set of arguments */
	static parse<T extends CommandChar>(d: string, offset: number){
		const char = d[offset] as CommandChar;
		offset++;
		return new Command(char, function*(){
			let o = -1;
			let args: number[] = [];
			const len = getCommandLength(char);
			for(let i = offset; i<d.length; i++){
				if(isCommandChar(d[i])) break; //a new command has been encountered the parent parse should handle that.
				if(isNumeric(d[i])){
					if(!~o) o = i; //set the start point
					continue;
				}
				if(~o){
					args.push(parseFloat(d.slice(o,i)));
					o = -1;
					if(args.length === len){
						yield args as CmdArgs<T>;
						args = [];
					}
				}
			}
			if(~o){
				args.push(parseFloat(d.slice(o)));
				o = -1;
				if(args.length === len){
					yield args as CmdArgs<T>;
					args = [];
				}
			}
			
			if(args.length){
				throw new Error(`Path Parse error: Missing arguments, expected: ${len}, recieved: ${args.length}`);
			}
		})
	}
}

export default Command;



