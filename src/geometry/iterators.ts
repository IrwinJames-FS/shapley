/*
In order to keep the rendering process as efficient as possible I will be using Generators to append actions to an iteration rather then run multiple iterations.
*/
import { add, divide, getAngle, multiplyScalar, ray } from "./psimd";
import { Point, Rect, Vector } from "./types";

const CIRCLE = Math.PI * 2;

/**
 * Polygon is a **reusable** iterator. It is designed this way to reduce the need to preserve arguments. 
 * 
 * This method assumes that the radius is 2 and the center is 0 this will allow subsequent computations. 
 * @param sides 
 * @param rotation 
 * @returns 
 */
export const polygon = (sides: number, rotation: number) => function*(): Generator<Vector> {
	const t = CIRCLE/sides;
	const center: Point = [0,0];
	for(let i = rotation; i<CIRCLE+rotation; i += t) {
		yield ray(1, i, center);
	}
}

/**
 * The translate method appends a translate action to the end of each generator iteration
 * @param gen 
 * @param pos 
 */
export function* translate(gen: Generator<Vector>, pos: Point): Generator<Vector> {
	for(const p of gen) {
		yield add(p, pos);
	}
}

/**
 * The normalize method uses a minimum coordinate values and the dimensions of the Generator to move all point to appear between 0-1.
 * This is helpful if you are building graphics that need to be represented in objectBoundingBox units. 
 * @param gen 
 * @param boundingBox
 */
export function* normalize(gen: Generator<Vector>, [mx, my, width, height]: Rect): Generator<Vector> {
	;
	const size = [width, height]
	//translating by mx and mx ensures my minimum point is now 0 and 0.
	for(const p of translate(gen, multiplyScalar([mx, my], -1))) {
		//convert the position to a percentage.
		yield divide(p, size); //if smallest point is always 0 then the size is always the largest points.
	}
}

/**
 * This rounding method is not reliant on the shape descriptor but rather just using the point to find the angle to the last point
 * 
 * **Warning:** This not longer returns a Vector Generator. 
 * @param gen 
 * @param cornerRadius 
 */
export function* rounded(gen:Generator<Vector>, cornerRadius:number | number[]):Generator<[Vector, Vector | undefined, Vector | undefined]>{
	//A corner needs three points to round as such the first two vectors will 
	const isArr = Array.isArray(cornerRadius);
	let first: Vector | undefined;
	let second: Vector | undefined;

	//cursors so we dont need to reiterate
	let a: Vector | undefined;
	let b: Vector | undefined;
	let i: number = 1;

	for(const v of gen){
		
		if(!first) {
			first = v;
			a = v;
			continue;
		} else if (!second) {
			second = v;
			b = v;
			continue;
		}
		let cr = isArr ? (cornerRadius as number[])[i] ?? 0:cornerRadius;
		
		i++;
		yield round(b!, a!, v, cr);
		a = b;
		b = v;
	}
	//still need the last two
	//the last of the iterator
	const lr = round(b!, a!, first!, isArr ? (cornerRadius as number[])[i] ?? 0:cornerRadius);
	yield lr;

	//the first of the iterator
	yield round(first!, b!, second!, isArr ? (cornerRadius as number[])[0] ?? 0:cornerRadius);
}

/**
 * Uses three Vectors ignoring the angle property this method assumes *a* is the meeting point of *b* and *c* it then casts a ray back down that line the distance of the corner radius. 
 * 
 * The corner radius can be a static number which is applied to each vertex or the cornerRadius can be an array matching the initial generators lenth. any undefined radius will be assumed as 0.
 * @param a 
 * @param b 
 * @param c 
 * @param cr 
 * @returns 
 */
export const round = (a: Vector, b: Vector, c: Vector, cr: number=0): [Vector, Vector | undefined, Vector | undefined] => {
	return !cr ? [a, undefined, undefined]:[
	a,
	ray(cr,getAngle(a,b), [...a.slice(0,2), 0] as Vector),//gotta reset the vector or it will offset the line
	ray(cr,getAngle(a,c), [...a.slice(0,2), 0] as Vector)
]
}

/**
 * Measures the polygon and returns a rect describing the bounding box.
 * 
 * It is recommened to use this prior to scaling or translating the polygon.
 * 
 * - update 08/08/24: Will now return the min x,y and the dimensions. This seems to just be a more reusable format.
 * @param { Generator<Vector> } gen 
 * @returns { Rect }
 */
export const boundingBox = (gen: Generator<Vector>): Rect => {
	let mx:number, my: number, Mx: number, My:number = Mx = my = mx = 0;
	for(const [x,y] of gen){
		mx = Math.min(mx, x);
		my = Math.min(my, y);
		Mx = Math.max(Mx, x);
		My = Math.max(My, y);
	}
	return [mx, my, Mx-mx, My-my];
}

export const aspect = ([,,width, height]: Rect) => {
	const m = Math.max(width, height);
	return `${width/m} / ${height/m}`
}