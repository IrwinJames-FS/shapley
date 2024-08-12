/*
In order to keep the rendering process as efficient as possible I will be using Generators to append actions to an iteration rather then run multiple iterations.
*/
import { add, divide, multiplyScalar, ray } from "./psimd";
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

export function* translate(gen: Generator<Vector>, pos: Point): Generator<Vector> {
	for(const p of gen) {
		yield add(p, pos);
	}
}

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