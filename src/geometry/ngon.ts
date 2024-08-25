import { round } from "./arithmetic";
import Point from "./Point";
import RoundedCorner from "./RoundedCorner";

type DArg = string | number | number[] | Point | RoundedCorner | undefined;

/**
 * This template array method simplifies the path creation process by adding additional support for numbers and arrays of numbers. 
 * 
 * This method accepts strings, numbers, number arrays, Point and RoundedCorner types. Arrays will only use the first two values. Point and RoundedCorner have special toString methods which are utilized to add support here. 
 * 
 * @todo Update the DArg value to accept a generic type that has a toString method instead of a Point or RoundedCorner method this will allow other drawing classes to be implemented in later iterations.
 * @param strings 
 * @param args 
 * @returns 
 */
export const $d = (strings: TemplateStringsArray, ...args: DArg[]): string => strings.reduce((o,v,i)=>{
	if(i>=args.length || args[i] === undefined) return o+v;
	if((args[i] instanceof Point) || (args[i] instanceof RoundedCorner)) return o+v+args[i]
	//all arrays will only use the first two points until I encounter a use case for anything else.
	if(Array.isArray(args[i])) return o+v+args[i].slice(0,2).map(v=>round(v, 5)).join(', ');
	return o+v+(typeof args[i] === 'string' ? args[i]:round(args[i], 5));
}, '');

