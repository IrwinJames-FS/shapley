import { aspect, boundingBox, normalize, polygon } from "./iterators";
import { ray, subtract } from "./psimd";
import { Ngon, Vector } from "./types";

/**
 * NGON calculates the points and returns key information about the 
 * @returns 
 */
const ngon = (sides: number=6, rotation: number, cornerRadius: number, square: boolean = false): Ngon => {
	//I need to generate a path if a cached one does not exist
	const gen = polygon(sides, rotation);
	const size = boundingBox(gen());
	
	const anti = Math.PI - ((sides-2) * Math.PI / sides)/2;
	return [
		square ? '1/1': aspect(size),
		square ? '-1 -1 2 2':'0 0 1 1',
		fill(square ? gen():normalize(gen(), size), cornerRadius, anti)
	];
};



export default ngon;

/* SVG Rendering */

const fill = (gen: Generator<Vector>, cornerRadius: number = 0, antiAngle: number = 0): string => {
	let d = '';
	for(const v of gen) {
		const c = d ? ' L':'M';
		if(cornerRadius && antiAngle) {
			const start = ray(cornerRadius, -antiAngle, v);
			const end = ray(cornerRadius, antiAngle, v);
			d += $d`${c} ${start} Q ${v} ${end}`;
		} else {
			d += $d`${c} ${v}`
		}
	}
	return d+'z';
}

type DArg = string | number | number[];

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
	if(!args[i]) return o+v;
	//all arrays will only use the first two points until I encounter a use case for anything else.
	if(Array.isArray(args[i])) return o+v+args[i].slice(0,2).map(v=>v.toFixed(5)).join(', ');
	return o+v+(typeof args[i] === 'string' ? args[i]:args[i].toFixed(5));
}, '');

