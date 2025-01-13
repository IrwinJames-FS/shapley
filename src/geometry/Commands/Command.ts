
//First declaring the types then I'll declare a value representation as well

import { MAX_NUMERIC_CHAR_CODE, MIN_NUMERIC_CHAR_CODE, PERIOD_CHAR_CODE, SUBTRACT_CHAR_CODE } from "../constants";
import { Gen } from "../Gen";
import { Point } from "../types";
import { add, extractPoints, scale, translate } from "../utils";
import { ArcCommandChar, BiCommandChar, ClosingCommandChar, CmdArgs, CommandArguments, CommandChar, CommandLength, HexCommandChar, QuadCommandChar, SingleCommandChar } from "./types";

/**
 * The Command class is a sort of an abstraction layer built to work with multiple sources however it is geared to replicate the behavior of an SVG path command. 
 * 
 * A command can hold multiple instances of that command which will be invoked subsequently in the order yielded.
 * 
 * In addition to providing an interface with the instances so they can be evaluated  individually this method provides a method to track its current position so paths can be measured without additional iterations. 
 * 
 * @example
 * import { Command } from "@irwinproject/shapley";
 * 
 * new Command("z");
 * new Command("m", function*(){yield [0,0]});
 */
export class Command<T extends CommandChar = CommandChar> extends Gen<CmdArgs<T>> {
	/**
	 * The command character represent an function that will be invoked for each instance of arguments. 
	 */
	fn: T

	/**
	 * Not to be confused with an arrays length method this method describes the number of arguments an instance should expect.
	 */
	len: CommandLength<T>

	/* Are only populated during an iteration */

	/**
	 * The min value is populated each render with the minimum point discovered within the commands instances. 
	 */
	min?: Point
	/**
	 * The max value is populated each render with the maximum point discovered within the commands instances. 
	 */
	max?: Point

	/**
	 * This point will only be populated during the iterations and is used as a cursor to track the paths position.
	 */
	currentPosition?: Point

	/**
	 * The final position will be populated after each iteration representing where the command path concludes.
	 */
	finalPosition?: Point

	/**
	 * Similar to the final position the first position is populated once the command is iterated. 
	 */
	firstPosition?: Point

	/**
	 * The command initializer expects an svg command character and a generator function that yields a number tuple matching the expected length
	 * @param fn 
	 * @param values 
	 */
	constructor(fn: T, values: CommandArguments<T>=function*(){}){
		super(values);
		this.fn = fn;
		this.len = getCommandLength(fn);
	}

	/**
	 * Iterate over each instance of the command
	 * @example
	 * import { Command } from "@irwinproject/shapley";
	 * 
	 * const M = new Command.parse("M 50,0 100,50 50,100, 0,50", 0);
	 * for(const [x,y] of M.each()){
	 *    //...
	 * }
	 * 
	 * const Q = new Command.parse("Q 50,0 50,50");
	 * for(const [cx, cy, x, y] of Q.each()){
	 *    //...
	 * }
	 */
	*each():Generator<CmdArgs<T>>{
		const isAbs = isAbsolute(this.fn);
		let cp: Point | undefined = this.currentPosition;
		let mp: Point | undefined = this.currentPosition;
		let Mp: Point | undefined = this.currentPosition;
		for(const n of super.each()){
			if(n.length !== this.len) throw new Error("Invalid argument length");
			if(isAbs) {
				//check the minimum and maximum and current position
				switch (this.len){
					case 0: break;
					case 1:
						
						if(!cp){
							cp = [0,0];
						}
						if(isChar(this.fn, "h")){
							cp[0] = n[0] as number;
						} else {
							cp[1] = n[0] as number
						}
						mp = minPoint(mp, cp);
						Mp = maxPoint(Mp, cp);
						break;
					case 7:
						cp = n.slice(n.length-2) as Point;
						mp = minPoint(mp, cp);
						Mp = maxPoint(Mp, cp);
						break;
					default:
						cp = n.slice(n.length-2) as Point;
						mp = minPoint(mp, ...extractPoints(...n));
						Mp = maxPoint(Mp, ...extractPoints(...n));
				}
			} else {
				switch(this.len){
					case 0: break;
					case 1:
						if(!cp) cp = [0,0]
						if(isChar(this.fn, "h")) cp[0] += n[0] as number;
						else cp[1] += n[0] as number;
						mp = minPoint(mp, cp);
						Mp = maxPoint(Mp, cp);
						break;
					case 7:
						if(!cp) cp = n.slice(n.length-2) as Point;
						else cp = cp.map((v,i)=>v+n[(n.length-2)+i]) as Point;
						mp = minPoint(mp, cp);
						Mp = maxPoint(Mp, cp);
						break;
					case 2:
						if(!cp) cp = n.slice(n.length-2) as Point;
						else cp = cp.map((v,i)=>v+n[(n.length-2)+i]) as Point;
						mp = minPoint(mp, cp);
						Mp = maxPoint(Mp, cp);
						break;
					default:
						const pts = extractPoints(...n.slice(0,-2)).map(p=>add(p,cp ?? [0,0]));
						if(!cp) cp = n.slice(n.length-2) as Point;
						else cp = cp.map((v,i)=>v+n[(n.length-2)+i]) as Point;
						mp = minPoint(mp, ...pts);
						Mp = maxPoint(Mp, ...pts);
						break;
				}
			}
			if(!this.firstPosition) this.firstPosition = cp;
			this.min = minPoint(this.min, mp);
			this.max = maxPoint(this.max, Mp);
			this.currentPosition = cp;
			yield n;
		}
		this.finalPosition = this.currentPosition;
		this.currentPosition = undefined;
	}


	/**
	 * Translates a command set
	 * @param x 
	 * @param y 
	 */
	translate(x: number, y: number){
		const fn = this.fn;
		return this.apply(gen=>function*(){
			for(const arr of gen()){
				if(isChar(fn, "h")){
					yield [arr[0]! + x] as CmdArgs<T>;
				} else if(isChar(fn, "v")){
					yield [arr[0]! + y] as CmdArgs<T>;
				} else {
					yield (arr.length === 7 ? [...arr.slice(0, 5), ...translate(x,y, ...arr.slice(5))]:translate(x,y, ...arr)) as CmdArgs<T>;
				}
				
			}
		});
	}

	scale(x: number, y: number){
		const fn = this.fn;
		return this.apply(gen=>function*(){
			for(const arr of gen()){
				if(isChar(fn, "h")){
					yield [arr[0]! * x] as CmdArgs<T>;
				} else if(isChar(fn, "v")){
					yield [arr[0]! * y] as CmdArgs<T>;
				} else {
					const trans = (arr.length === 7 ? [...scale(x,y, ...arr.slice(0,2)), ...arr.slice(2,5), ...arr.slice(5)]:scale(x,y, ...arr)) as CmdArgs<T>;
					yield trans
				}
				
			}
		});
	}

	/**
	 * Converts a Command to a string matching the expected format of the svg command path.
	 * @returns
	 */
	toString():string{
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

	/** 
	 * Parse the next set of arguments 
	 * @example
	 * import { Command } from "@irwinproject/shapley";
	 * 
	 * const cmd = Command.parse(A 10 10 180 1 0 20, 0);
	 */
	static parse<T extends CommandChar>(d: string, offset: number): Command{
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

/**
 * Checks if a character is a capital or lowercase variation by examining char code.
 * 
 * This method is used in the svg parsing process and likely will be made private in the future.
 * @param c 
 * @param x 
 * @returns 
 * @example
 * import { isChar } from "@irwinproject/shapley";
 * 
 * const ischar = isChar("A", "a"); //true
 */
export const isChar = <T extends CommandChar>(c: string, x: T): c is T => {
	const a = c.charCodeAt(0);
	const b = x.charCodeAt(0);
	return a === b 
	|| (a ^ 32) === b;
}

/**
 * Check if character is acceptible in a number.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param c 
 * @returns 
 * @example
 * import {isNumeric} from "@irwinproject/shapley";
 * 
 * isNumeric("-"); //true
 * isNumeric("."); //true
 * isNumeric("0"); //true
 * isNumeric("e"); //false
 */
export const isNumeric = (c: string)=>{
	const cd = c.charCodeAt(0);
	return (cd >= MIN_NUMERIC_CHAR_CODE && cd <= MAX_NUMERIC_CHAR_CODE) || cd === PERIOD_CHAR_CODE || cd === SUBTRACT_CHAR_CODE;
};

/**
 * Checks if the command character's code matches z or Z.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example
 * import { isClosingChar } from "@irwinproject/shapley";
 * 
 * isClosingChar("z"); //true
 * isClosingChar("Z"); //true
 * isClosingChar("a"); //false
 */
export const isClosingChar = (s:string):s is ClosingCommandChar => isChar(s, "z");

/**
 * Checks if the command character's code matches h, H, v or V.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example
 * import { isSingleChar } from "@irwinproject/shapley";
 * 
 * isSingleChar("v"); //true
 * isSingleChar("z"); //false
 */
export const isSingleChar = (s: string): s is SingleCommandChar => isChar(s, "h") || isChar(s,"v");

/**
 * Checks if the command character's code matches m, M, l, L, t or T.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example
 * import { isBiChar } from "@irwinproject/shapley";
 * 
 * isBiChar("M"); //true
 * isBiChar("h"); //false
 */
export const isBiChar = (s: string): s is BiCommandChar => isChar(s, "m") || isChar(s, "l") || isChar(s, "t");

/**
 * Checks if the command character's code matches s, S, q or Q.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example
 * import { isQuadChar } from "@irwinproject/shapley";
 * 
 * isQuadChar("s"); //true
 * isQuadChar("m"); //false
 */
export const isQuadChar = (s: string): s is QuadCommandChar => isChar(s, "s") || isChar(s, "q");

/**
 * Checks if the command character's code matches c or C.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example 
 * import { isHexChar } from "@irwinproject/shapley";
 * 
 * isHexChar("c"); //true
 * isHexChar("m"); //false
 */
export const isHexChar = (s: string): s is HexCommandChar => isChar(s, "c");

/**
 * Checks if the command character's code matches a or A.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example
 * import { isArcChar } from "@irwinproject/shapley";
 * 
 * isArcChar("a"); //true
 * isArcChar("m"); //false
 */
export const isArcChar = (s: string): s is ArcCommandChar => isChar(s, "a");

/**
 * Checks if the provided character is a supported character.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param s 
 * @returns 
 * @example
 * import { isCommandChar } from "@irwinproject/shapley";
 * 
 * isCommandChar("z"); //true
 * isCommandChar("e"); //false
 */
export const isCommandChar = (s: string): s is CommandChar => isClosingChar(s)
|| isSingleChar(s)
|| isBiChar(s)
|| isQuadChar(s)
|| isHexChar(s)
|| isArcChar(s);


/**
 * Based on the command char the length can be determined.
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param char 
 * @returns
 * @example
 * import { getCommandLength } from "@irwinproject/shapley";
 * 
 * getCommandLength("z"); //0
 * getCommandLength("h"); //1
 * getCommandLength("m"); //2
 * getCommandLength("s"); //4
 * getCommandLength("c"); //6
 * getCommandLength("a"); //7 
 */
export const getCommandLength = <T extends CommandChar>(char: T): CommandLength<T> => (isClosingChar(char) ? 0
: isSingleChar(char) ? 1
: isBiChar(char) ? 2
: isQuadChar(char) ? 4
: isHexChar(char) ? 6
: 7) as CommandLength<T>;

/**
 * Checks if a command character is an absolute command (upper case).
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param char 
 * @returns 
 * @example
 * import { isAbsolute } from "@irwinproject/shapley";
 * 
 * isAbsolute("a"); //false
 * isAbsolute("A"); //true
 */
export const isAbsolute = (char: CommandChar) => {
	const c = char.charCodeAt(0);
	return c >= 65 && c <= 90;
}


/**
 * Compare a point using a numeric comparitor method
 * 
 * This method is used in the parsing process and will likely be made private in the future.
 * @param fn 
 * @param points 
 * @example 
 * import { compPoint } from "@irwinproject/shapley";
 * 
 * compPoint(Math.min, [50,0, 100,50, 50,100, 0,50]); //[0,0]
 * compPoint(Math.max, [50,0, 100,50, 50,100, 0,50]); //[100,100]
 */
export const compPoint = (fn: (...values: number[])=>number, ...points: (Point | undefined)[]) => {
	let m: Point | undefined;
	for(const p of points){
		if(!p) continue;
		if(!m) {
			m = p;
			continue;
		}
		m = [
			fn(m[0], p[0]),
			fn(m[1], p[1])
		]
	}
	return m;
}

export const minPoint = (...points: (Point | undefined)[])=> compPoint(Math.min, ...points);

export const maxPoint = (...points: (Point | undefined)[]) => compPoint(Math.max, ...points);




