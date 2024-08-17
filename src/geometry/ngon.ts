import { limitDecimal } from "./arithmetic";
import Point from "./Point";
import RoundedCorner from "./RoundedCorner";

type DArg = string | number | number[] | Point | RoundedCorner | undefined;

/**
 * @private
 * This template array method simplifies the path creation process by adding additional support for numbers and arrays of numbers. 
 * 
 * to Fixed is pegged at 5 this is to prevent differences between server side and client side calculations as node seems to have a higher precision by default. 
 * @param strings 
 * @param args 
 * @returns 
 */
export const $d = (strings: TemplateStringsArray, ...args: DArg[]): string => strings.reduce((o,v,i)=>{
	if(i>=args.length || args[i] === undefined) return o+v;
	if((args[i] instanceof Point) || (args[i] instanceof RoundedCorner)) return o+v+args[i]
	//all arrays will only use the first two points until I encounter a use case for anything else.
	if(Array.isArray(args[i])) return o+v+args[i].slice(0,2).map(v=>limitDecimal(v, 5)).join(', ');
	return o+v+(typeof args[i] === 'string' ? args[i]:limitDecimal(args[i], 5));
}, '');

