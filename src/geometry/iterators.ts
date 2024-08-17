/*
In order to keep the rendering process as efficient as possible I will be using Generators to append actions to an iteration rather then run multiple iterations.
*/

import Point from "./Point";
import RoundedCorner from "./RoundedCorner";
import { VertexGenerator } from "./types";


export const bufferIterator = (points: number[]):VertexGenerator => function*() {
	if(points.length % 2) throw new Error("Invalid buffer size");
	for(let i = 0; i<points.length; i+=2) yield new Point(points[i], points[i+1]);
}

export const fromCircle = (stops: number, rotation: number=0, center: Point = Point.zero): VertexGenerator => function*(){
	if(!stops) throw new Error("At least two stop must be requested");
	if(stops < 3) console.warn("The smallest polygon typically has 3 sides");
	const delta = (Math.PI*2)/stops;
	for(let i = 0; i<stops; i++) yield center.ray((delta*i)+rotation, 0.5);
}

/*
Mutators

The first agument of each Mutator should be the generator it is mutating
*/

/**
 * A reusable mutation generator which translates all points by a provided point
 * @param gen 
 * @param point 
 * @returns 
 */
export const translate = (gen:VertexGenerator, point: Point): VertexGenerator => function*(){
	for(const p of gen()) yield p.add(point);
}

/**
 * A resuable mutation generator which rotates all points around a provided center point by a provided angle
 * @param gen 
 * @param angle 
 * @param center 
 * @returns 
 */
export const rotate = (gen: VertexGenerator, angle: number, center: Point): VertexGenerator => function*(){
	for(const p of gen()) yield p.rotateAround(center, angle);
}

/**
 * A reusable mutation generator which scales all points by a 2D scale factor.
 * @param gen 
 * @param scaleFactor 
 * @returns 
 */
export const scale = (gen: VertexGenerator, scaleFactor: Point): VertexGenerator => function*(){
	for(const p of gen()) yield p.multiply(scaleFactor);
}

/**
 * Rounds each corner.
 * @param gen 
 * @param cornerRadius 
 * @returns 
 */
export const round = (gen: VertexGenerator, cornerRadius: number | number[]): VertexGenerator => function*(){
	const generator = gen();
	let cursor = generator.next();
	let a = cursor.value;
	if(cursor.done) {
		yield a;
		return; //cant round a single point
	}
	cursor = generator.next();
	let b = cursor.value;
	if(cursor.done) {
		yield a;
		yield b;
		return; //cant really round two points either
	}
	const first = a;
	const second = b;
	let i = 1;
	for(const [x,y] of generator){
		const c = new Point(x,y);
		const [s, e] = rounding(b, a, c, cornerRadius, i);
		i++;
		yield new RoundedCorner(s, b, e);
		a = b;
		b = c;
	}
	
	const [ls, le] = rounding(b, a, first, cornerRadius, i);
	yield new RoundedCorner(ls, b, le);

	const [fs, fe] = rounding(first, b, second, cornerRadius, 0);
	yield new RoundedCorner(fs, first, fe);
}

const rounding = (a: Point, b: Point, c: Point, cornerRadius:number | number[], i: number) => {
	const cr:number = Array.isArray(cornerRadius) ? (cornerRadius as number[])[i] ?? 0:cornerRadius;
	const {angle: a1} = a.to(b);
	const {angle: a2} = a.to(c);
	return [
		a.ray(a1, cr),
		a.ray(a2, cr)
	]
}