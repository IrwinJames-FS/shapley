/*
https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
*/

import psimd, { PSIMDable } from "./psimd";

/**
 * The SVG path command characters
 */
export type ClosingCommandChars = "z" | "Z";
export type SingleValueCommandChars = "H" | "h" | "V" | "v";
export type BiValueCommandChars = "M" | "m" | "L" | "l" | "T" | "t";
export type QuadValueCommandChars = "S" | "s" | "Q" | "q";
export type HexaValueCommandChars = "C" | "c";
export type ArcCommandChars = "A" | "a";
export type PathCommandChars = ClosingCommandChars | SingleValueCommandChars | BiValueCommandChars | QuadValueCommandChars | HexaValueCommandChars | ArcCommandChars;

/**
 * The path command is intendended to act as a way to replicate SVG's path commands independent of environment. 
 * While I wont build in full support in theory it would be extended to have the full host of path commands. 
 */
abstract class PathCommand extends psimd {
	cmd: PathCommandChars
	cmdLength: number
	constructor(cmd: PathCommandChars, cmdLength:number, ...values: number[]){
		if((cmdLength && values.length%cmdLength) || (!cmdLength && values.length)) throw new InvalidArgumentLength(cmdLength, !cmdLength ? values.length:values.length%cmdLength);
		super(...values);
		this.cmd = cmd;
		this.cmdLength = cmdLength;
	}

	/**
	 * a path command simply joints the values by a space. this is applicable to the simplest commands z Z h H v V
	 * @returns 
	 */
	toString(): string {
		return this.cmd + (this.length ? ' '+Array.from(this.stride(2), p=>p.join(',')).join(' '):'');
	}
}

export class InvalidArgumentLength extends Error {
	constructor(expected: number, provided:number){
		super(`Invalid argument length expected:${expected} and received ${provided}.`);
		this.name = "InvalidArgumentLength";
	}
}
export class ClosingCommand extends PathCommand {
	constructor(cmd: ClosingCommandChars){
		super(cmd, 0);
	}
}

export class SingleValueCommand extends PathCommand {
	constructor(cmd: SingleValueCommandChars, ...values: number[]){
		super(cmd, 1, ...values)
	}

	/**
	 * a path command simply joints the values by a space. this is applicable to the simplest commands z Z h H v V
	 * @returns 
	 */
	toString(): string {
		return this.cmd + (this.length ? ' '+this.join(' '):'');
	}
}
export class BiValueCommand extends PathCommand {
	constructor(cmd: BiValueCommandChars, ...values: number[]){
		super(cmd, 2, ...values);
	}
}

export class QuadValueCommand extends PathCommand {
	constructor(cmd: QuadValueCommandChars, ...values: number[]){
		if(values.length%4) throw new InvalidArgumentLength(4, values.length%4);
		super(cmd, 4, ...values);
	}
}

export class HexaValueCommand extends PathCommand {
	constructor(cmd: HexaValueCommandChars, ...values: number[]){
		if(values.length%6) throw new InvalidArgumentLength(6, values.length%6);
		super(cmd, 6, ...values)
	}
}

/**
 * The arc command is a little tricky as it accepts flags which should never be mutated via scaling or translation. also contains angles which should only be rotated.
 */
export class ArcValueCommand extends PathCommand {
	radii: number[] = []
	angles: number[] = []
	flags: number[] = []
	constructor(cmd: ArcCommandChars, ...values: number[]){
		const radii: number[] = [];
		const angles: number[] = [];
		const flags: number[] = [];
		const vals: number[] = [];
		for(const [dx, dy, angle, lgSweep, sweep, x,y] of psimd.stride(values, 7)){
			
			radii.push(dx, dy);
			vals.push(x,y);
			angles.push(angle);
			flags.push(lgSweep, sweep);
		}
		super(cmd, 2, ...vals);
		this.radii = radii;
		this.angles = angles;
		this.flags = flags;
	}

	toString(): string {
		return `${this.cmd} ${Array.from(this.stride(2), (p, i)=>{
			const j = i*2;
			const k = j+1;
			return [
				this.radii[j],
				this.radii[k],
				this.angles[i],
				this.flags[j],
				this.flags[k],
			].join(' ') + ' '+ p.join(',');
		}).join(' ')}`
	}
}
export const PathCommands: Record<PathCommandChars, (...vals:number[])=>PathCommand> = {
	Z(){ return new ClosingCommand("Z"); },
	z(){ return new ClosingCommand("z"); },
	H(...values){ return new SingleValueCommand("H", ...values); },
	h(...values){ return new SingleValueCommand("h", ...values); },
	V(...values){ return new SingleValueCommand("V", ...values); },
	v(...values){ return new SingleValueCommand("v", ...values); },
	M(...values){ return new BiValueCommand("M", ...values); },
	m(...values){ return new BiValueCommand("m", ...values); },
	L(...values){ return new BiValueCommand("L", ...values); },
	l(...values){ return new BiValueCommand("l", ...values); },
	T(...values){ return new BiValueCommand("T", ...values); },
	t(...values){ return new BiValueCommand("t", ...values); },
	S(...values){ return new QuadValueCommand("S", ...values); },
	s(...values){ return new QuadValueCommand("s", ...values); },
	Q(...values){ return new QuadValueCommand("Q", ...values); },
	q(...values){ return new QuadValueCommand("q", ...values); },
	C(...values){ return new HexaValueCommand("C", ...values); },
	c(...values){ return new HexaValueCommand("c", ...values); },
	A(...values){ return new ArcValueCommand("A", ...values); },
	a(...values){ return new ArcValueCommand("a", ...values); },
}

export const isSupported = (k: string): k is PathCommandChars => {
	return k in PathCommands;
}
/**
 * This method is intended to allow for a complete parsing and manipulation of an svg path command
 * @param commands 
 */
export function* parseD(commands: string): Generator<PathCommand> {
	commands = commands.trim(); //make sure it doesnt start with a space or newline
	for(let i = 0; i<commands.length;){
		const cmd = commands[i];
		i++;
		const start = i;
		for(; i<commands.length && !/[A-Za-z]/.test(commands[i]); i++);
		const args = commands.slice(start, i).split(/[\s,]/g).flatMap(n=>{
			const v = parseFloat(n)
			return isNaN(v) ? []:[v];
		});
		if(!isSupported(cmd)) throw new Error(`Unsupported command char: ${cmd}`);
		const command = PathCommands[cmd](...args);
		yield command;
	}
}
export default PathCommand;