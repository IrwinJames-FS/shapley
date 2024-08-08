/*
In order to keep the rendering process as efficient as possible I will be using Generators to append actions to an iteration rather then run multiple iterations.
*/
import { ray } from "./psimd";
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
 * Measures the polygon and returns a rect describing the bounding box.
 * 
 * It is recommened to use this prior to scaling or translating the polygon.
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
	return [mx, my, Mx, My];
}