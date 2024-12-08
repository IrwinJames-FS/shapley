import { Tuple } from "./types";

export const ray = (distance: number, angle: number, x: number = 0, y: number = 0): [x: number, y:number] => [
	distance * Math.cos(angle) + x,
	distance * Math.sin(angle) + y
]

/**
 * Client side javascript starts using scientific notation after a precision of 7 Another issue is the default precision supported in node and client side may vary. This should standardize that. 
 * @param value 
 * @param precision 
 * @returns 
 */
export const toPrecision = (value: number, precision: number = 6) => {
	if(!value)return value;
	const mult = 10**precision;
	return Math.floor(value*mult)/mult;
}

/**
 * Striding is common in a lot of languages this implementation is intended to reduce copying only to relevant data
 * @param iterator 
 * @param ln 
 * @returns 
 */
export function* stride<T, N extends number>(iterator: Iterable<T>, ln: N): Generator<Tuple<T,N>>{
	if(!ln) return;
	let entry: T[] = []
	for(const iter of iterator){
		entry.push(iter);
		if(entry.length === ln) {
			yield entry as Tuple<T, N>;
			entry = [];
		}
	}
}