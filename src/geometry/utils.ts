import { CIRCLE } from "./constants";
import { GeneratorList } from "./Gen";
import { Point, Tuple } from "./types";

/**
 * Cast a ray from provided point or origin (0,0).
 * @param distance 
 * @param angle 
 * @param param2 
 * @returns 
 */
export const ray = (distance: number, angle: number, [x,y]:Point = [0,0]): [x: number, y:number] => {
	return [
		toPrecision(distance * Math.cos(angle) + x),
		toPrecision(distance * Math.sin(angle) + y)
	]
}

/**
 * Find the angle from the first point to the second point.
 * @param point1
 * @param point2
 * @returns 
 */
export const angleTo = ([x1,y1]: Point, [x2, y2]: Point) => {
	const a = Math.atan2(y2-y1, x2-x1);
	return a < 0 ? a + CIRCLE:a
}
/**
 * While slice is not expensive it is still more expensive then pulling two explict values from a list
 */
export const pt = (list: readonly number[], index: number): Point => [list[index], list[index+1]]

/**
 * Grab the angle from origin to a position.
 * @param point 
 * @returns 
 */
export const ang = (point: Point)=>angleTo([0,0], point);

export const distance = ([x1, y1]:Point, [x2, y2]: Point) => Math
.sqrt((x2-x1)**2+(y2-y1)**2);


/**
 * Get the angle from the first point to the second point as well as the distance
 * @param point1 
 * @param point2 
 * @returns 
 */
export const info = (point1: Point, point2: Point):[angle: number, distance: number] => [
	angleTo(point1, point2),
	distance(point1, point2)
];

/**
 * Client side javascript starts using scientific notation after a precision of 7 Another issue is the default precision supported in node and client side may vary. This should standardize that. 
 * @param value 
 * @param precision 
 * @returns 
 */
export const toPrecision = (value: number, precision: number = 6) => {
	if(!value)return value;
	if(!precision) return Math.floor(value);
	const floor = parseFloat(`0.1e${-precision}`)
	if(value > -floor && value < floor) return 0;
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
	if(entry.length) throw new Error("Incomplete stride, " + entry);
}



/**
 * An internal method that I use to iterate of lines by threes
 * @param iterator 
 */
export function* rollingThree<T>(iterator: Generator<T>):Generator<T[]>{
	const first = iterator.next().value;
	if(!first) return;
	const second = iterator.next().value;
	if(!second) return yield [first];
	let isPlaced = false,
	previous = first,
	current = second;
	
	for(const next of iterator){
		isPlaced = true;
		yield [previous, current, next];
		previous = current;
		current = next;
	}
	if(!isPlaced) yield [first, second]
	else {
		yield [previous, current, first];
		yield [current, first, second];
	}
}

export const polygon = (sides: number, radius: number = 1, center:Point = [0,0], rotation: number=0) => function*(){
	const delta = CIRCLE/sides;
	const base = Math.floor(sides);
	const rem = delta * (sides%base)
	let angle = rotation;
	for(let i = 0; i<base;i++, angle+=delta){
		yield ray(radius, angle, center);
	}
	if(rem) yield ray(radius, angle-delta+rem, center);
}
export const allConnected = (gen: GeneratorList<Point>) => function*(){
	const points = Array.from(gen());
	for(let i = 0; i<points.length;i++){
		for(let j = i+1; j<points.length;j++){
			yield points[i]; 
			yield points[j];
		}
	}
}
export const translate = (x: number,y: number, ...values: number[]):number[] => {
	for(let i = 0; i<values.length; i+=2){
		values[i] += x;
		values[i+1] += y;
	}
	return values;
}

export const scale = (x: number, y: number, ...values: number[]):number[] => {
	for(let i = 0; i<values.length; i+=2){
		values[i] *= x;
		values[i+1] *= y;
	}
	return values
}
export const add = ([x1,y1]: Point, [x2,y2]: Point):Point => [x1+x2, y1+y2];

export const subtract = ([x1,y1]: Point, [x2,y2]: Point): Point => [x1-x2, y1-y2];

export const extractPoints = (...points: number[])=>Array.from(stride(points, 2));