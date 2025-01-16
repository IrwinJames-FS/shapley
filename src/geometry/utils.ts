import { CIRCLE } from "./constants";
import { GeneratorList } from "./Gen";
import { Point, Tuple } from "./types";

/**
 * Cast a ray from provided point or origin (0,0).
 * @param distance 
 * @param angle - Must be in radians.
 * @param param2 - The position the ray is cast from. 
 * @returns 
 * @example 
 * import { ray } from "@irwinproject/shapley";
 * //or
 * import { ray } from "@irwinproject/shapley/geometry/utils";
 * 
 * const distance = 10;
 * const angle = Math.PI/2; //90 degs
 * const point = ray(10,angle, [10, 10]);
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
 * @example
 * import { angleTo } from "@irwinproject/shapley";
 * //or
 * import { angleTo } from "@irwinproject/shapley/geometry/utils";
 */
export const angleTo = ([x1,y1]: Point, [x2, y2]: Point) => {
	const a = Math.atan2(y2-y1, x2-x1);
	return a < 0 ? a + CIRCLE:a
}
/**
 * While slice is not expensive it is still more expensive then pulling two explict values from a list
 * @param list The list to read the points from.
 * @param index The index to start reading from. 
 * @private
 */
export const pt = (list: readonly number[], index: number): Point => [list[index], list[index+1]]

/**
 * Grab the angle from origin to a position.
 * @param point 
 * @returns 
 * @private
 */
export const ang = (point: Point)=>angleTo([0,0], point);

/**
 * Gets the distance between two points
 * @param param0 
 * @param param1 
 * @returns 
 * @example 
 * import { distance } from "@irwinproject/shapley";
 * //or 
 * import { distance } from "@irwinproject/shapley/geometry/utils";
 * 
 * const dist = distance([1,1], [2,3]);
 */
export const distance = ([x1, y1]:Point, [x2, y2]: Point) => Math
.sqrt((x2-x1)**2+(y2-y1)**2);


/**
 * Get the angle from the first point to the second point as well as the distance.
 * @param point1 
 * @param point2 
 * @returns 
 * @example 
 * import { info } from "@irwinproject/shapley";
 * //or 
 * import { info } from "@irwinproject/shapley/geometry/utils";
 * 
 * const [angle, distance] = info([1,1], [2,3]);
 */
export const info = (point1: Point, point2: Point):[angle: number, distance: number] => [
	angleTo(point1, point2),
	distance(point1, point2)
];

/**
 * Client side javascript starts using scientific notation after a precision of 7 Another issue is the default precision supported in node and client side may vary. This should standardize that by shifting the decimal point to the desired position, rounding down then shifting the decimal point back.... no strings allowed. 
 * @param value 
 * @param precision 
 * @returns 
 * @example 
 * import { toPrecision } from "@irwinproject/shapley";
 * //or 
 * import { toPrecision } from "@irwinproject/shapley/geometry/utils";
 * 
 * //in some crazy environment where this could be handled.
 * const pi = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679;
 * //sending to an environment like the client
 * res.send(
 * 	toPrecision(pi, 7) //3.1415926
 * );
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
 * @example 
 * import { stride } from "@irwinproject/shapley";
 * //or 
 * import { stride } from "@irwinproject/shapley/geometry/utils";
 * 
 * const points = [50,0, 100,50, 50,100, 0,50];
 * 
 * Array.from(stride(points, 2));
 * //[[50,0],[100,50], [50,100], [0,50]]
 * 
 * for(const [x, y] of stride(points, 2)){
 * 
 * }
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
 * @private
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

/**
 * Creates a reusable method to generate the vertices of a polygon of a defined number of sides. 
 * @param sides - The number of sides can be a decimal value. (This allows for smooth transition from one polygon to another)
 * @param radius - By default the radius is 1 and Shape components use a radius of 0.5 kinda.
 * @param center
 * @param rotation - Rotation in radians. 
 * @returns
 * @example 
 * import { polygon } from "@irwinproject/shapley";
 * //or 
 * import { polygon } from "@irwinproject/shapley/geometry/utils";
 * 
 * Array.from(polygon(4, 1, [0,0], 0)()); //[50,0, 100,50, 50,100, 0,50]
 */
export const polygon = (sides: number, radius: number = 1, center:Point = [0,0], rotation: number=0):()=>Generator<Point> => function*(){
	const delta = CIRCLE/sides;
	const base = Math.floor(sides);
	const rem = delta * (sides%base)
	let angle = rotation;
	for(let i = 0; i<base;i++, angle+=delta){
		yield ray(radius, angle, center);
	}
	if(rem) yield ray(radius, angle-delta+rem, center);
}

/**
 * This function has absolutely no use other then a neat effect it produces. 
 * 
 * This function is more to test the way paths are stroked but I think it looks cool so use it if you like. 
 * @param gen 
 * @returns 
 * @example 
 * import { allConnected, polygon } from "@irwinproject/shapley";
 * //or 
 * import { allConnected, polygon } from "@irwinproject/shapley/geometry/utils";
 * 
 * const lines = allConnected(polygon(6)); //creates a hexagon with lines drawn to each point. 
 */
export const allConnected = (gen: GeneratorList<Point>): GeneratorList<Point> => function*(){
	const points = Array.from(gen());
	//each point needs to connect to all other points aside from its own. 
	for(let i = 0; i<points.length;i++){
		for(let j = i+1; j<points.length;j++){
			yield points[i]; 
			yield points[j];
		}
	}
}

/**
 * Translate all the values provided by their respective x or y values.
 * @param x 
 * @param y 
 * @param values 
 * @returns 
 */
export const translate = (x: number,y: number, ...values: number[]):number[] => {
	for(let i = 0; i<values.length; i+=2){
		values[i] += x;
		values[i+1] += y;
	}
	return values;
}

/**
 * Scales all the values provided by their respective x or y values.
 * @param x 
 * @param y 
 * @param values 
 * @returns 
 */
export const scale = (x: number, y: number, ...values: number[]):number[] => {
	for(let i = 0; i<values.length; i+=2){
		values[i] *= x;
		values[i+1] *= y;
	}
	return values
}

/**
 * Adds two points together.
 * @param param0 
 * @param param1 
 * @returns 
 */
export const add = ([x1,y1]: Point, [x2,y2]: Point):Point => [x1+x2, y1+y2];

/**
 * Subtracts two points
 * @param param0 
 * @param param1 
 * @returns 
 */
export const subtract = ([x1,y1]: Point, [x2,y2]: Point): Point => [x1-x2, y1-y2];

/**
 * Converts a flat array of numbers to an array of points
 * @param points 
 * @returns 
 */
export const extractPoints = (...points: number[]):Point[]=>Array.from(stride(points, 2));

export const toAbsolutePoints = (points: number[]): Point[] => {
	const absolutePoints:Point[] = [];
	let pos:Point = [0,0];
	for(let i = 0; i < points.length; i+=2){
		pos = add(pos, pt(points, i))
		absolutePoints.push([...pos] as Point);
	}
	return absolutePoints;
}