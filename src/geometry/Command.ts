
//First declaring the types then I'll declare a value representation as well

import Gen from "./Gen";
import { Tuple } from "./types";
import { stride } from "./utils";

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
export const ClosingChars = /[Zz]/;
export const SingleChars = /[HhVv]/;
export const BiChars = /[MmLlTt]/;
export const QuadChars = /[SsQq]/;
export const HexChars = /[Cc]/;
export const ArcChars = /[Aa]/;



/**
 * Based on the command char the length can be determined
 * @param char 
 * @returns 
 */
export const getCommandLength = <T extends CommandChar>(char: T): CommandLength<T> => (ClosingChars.test(char) ? 0
: SingleChars.test(char) ? 1
: BiChars.test(char) ? 2
: QuadChars.test(char) ? 4
: HexChars.test(char) ? 6
: 7) as CommandLength<T>;



class Command<T extends CommandChar> extends Gen<CmdArgs<T>> {
	fn: T
	len: CommandLength<T>
	constructor(fn: T, values: CommandArguments<T>=function*(){}){
		super(values);
		this.fn = fn;
		this.len = getCommandLength(fn);
	}

	toString(){
		let str: string = this.fn;
		switch (this.len) {
			case 0: break;
			case 1:
				for(const [v] of this.each()){
					str += ` ${v}`;
				}
				break;
			case 2:
				for(const [x,y] of this.each()){
					str += ` ${x},${y}`;
				}
			case 4:
				for(const [dx,dy, x,y] of this.each()){
					str += ` ${dx},${dy} ${x},${y}`;
				}
			case 6:
				for(const [mx, my, dx, dy, x,y] of this.each()){
					str += ` ${mx},${my} ${dx},${dy} ${x},${y}`;
				}
			case 7:
				for(const [rx, ry, a, F, f, x,y] of this.each()){
					str += ` ${rx} ${ry} ${a} ${F} ${f} ${x},${y}`;
				}
		}
		return str;
	}
}

export default Command;



