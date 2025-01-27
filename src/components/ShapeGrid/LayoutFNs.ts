import { Point } from "../../geometry";
import { ShapeGridLayoutFn } from "./ShapeGrid";

const unflatten = (size: number, index: number): Point => [
	index%size,
	Math.floor(index/size)
]
/*
Idea for later. Instead of layout functions ony providing the general layout perhaps they should be more like descriptors which provides the template and shape size as well.
*/

export interface TriangleLayoutOptions {
	/** Indicates if the triangles should use a horizontal layout pattern instead of vertical. */
	horizontal?: boolean

	/** The names of the triangles that should be used to clip the cell. these should be inverses of each other and equilateral. */
	triangles?: [string, string]
} 

/**
 * This is a naive layout method that makes some assumptions while laying out the triangles. 
 * 
 * 1. The triangle is equilateral.
 * 2. if triangle names are provided the names reference two inverse equilateral triangles. 
 * @param columns 
 * @param options 
 */
export const TriangleLayout = (columns: number, horizontal?:boolean, triangles?:[string, string]):ShapeGridLayoutFn => horizontal 
? index=>{
	const [c,r] = unflatten(columns, index);
	
	return {row: r+1, column: c*2+1, sref: triangles ? triangles[((r%2)+c)%2]:undefined};
}
: index=>{
	const cols = columns*2
	const [c,r] = unflatten(cols, index);
	return {row: r*2+1, column: c+1, sref: triangles ? triangles[((c%2)+r)%2]:undefined};
}

/**
 * @param columns 
 * @param sref 
 * @returns 
 */
export const DiamondLayout = (columns: number, sref?: string):ShapeGridLayoutFn => index => {
	const [c,r] = unflatten(columns, index);
	return {row:(r*2)+(c%2)+1, column: c+1, sref};
}

export const HexagonLayout = (columns: number, sref?: string, isVertical?: boolean, alt?: boolean, invert?:boolean):ShapeGridLayoutFn => isVertical 
? index => {
	const [c,r] = unflatten(columns, index);
	console.log(r);
	return {row:1+(r*4)+(c%2)*2, column: c+1, sref};
}
: alt ? index => {
	const [c,r] = unflatten(columns, index);
	const sup = Math.floor(columns/2);
	return {row: r*2+2+(c<sup ? 0:1), column: c<sup ? c*4+3:(c-sup)*4+1, sref};
}
:index => {
	const [c,r] = unflatten(columns, index);
	return {row: r*2+1+((c+Number(invert || false))%2), column:c*2+1, sref};
}