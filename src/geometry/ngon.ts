import { boundingBox, polygon } from "./iterators";
import { subtract } from "./psimd";
import { Ngon, Vector } from "./types";

/**
 * NGON calculates the points and returns key information about the 
 * @returns 
 */
const ngon = (sides: number=6): Ngon => {
	//I need to generate a path if a cached one does not exist
	const pathId = 'S-'+sides;
	const gen = polygon(sides, 0);
	const [mx, my, Mx, My] = boundingBox(gen());
	const [width, height] = subtract([Mx, My], [mx, my]);
	
	return [
		width/height,
		fill(gen())
	];
};



export default ngon;

/* SVG Rendering */
const fill = (gen: Generator<Vector>): string => {
	let d = '';
	for(const v of gen) {
		d += $d`${d ? ' L':'M'} ${v}`
	}
	return d+'z';
}

type DArg = string | number | number[];
const $d = (strings: TemplateStringsArray, ...args: DArg[]): string => strings.reduce((o,v,i)=>{
	if(!args[i]) return o+v;
	//all arrays will only use the first two points until I encounter a use case for anything else.
	if(Array.isArray(args[i])) return o+v+args[i].slice(0,2).map(v=>v.toFixed(5)).join(', ');
	return o+v+(typeof args[i] === 'string' ? args[i]:args[i].toFixed(5));
}, '');