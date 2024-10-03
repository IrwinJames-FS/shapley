import Arithmetic from "./arithmetic";
import { Pointish } from "./types";

/** 
 * The Point class is the foundation of shapley. This adds a series of two dimensional methods that are helpful when drawing without creating a reliance on a platform specific technolory.
 * 
 * I have made the concession to invert ray casting methods use of sin and cos the result of this is casting an array of 0 deg 1 unit will result in the point [0, 1] instead of [1, 0]... This is benefitial when rendering regular polygons. 
 */
export class Point extends Array<number> {
	cmd: string = "L"
	/**
	 * 
	 * @param pt 
	 * @returns 
	 */
	stringr: (pt: Point)=>string = pt=>{
		let str = ''
		for(let i = 0; i<pt.length; i+=2) str += ` ${pt[i]},${pt[i+1]}`;
		return str
	}
	/**
	 * All points will have at least two values however may contain more then two values.
	 * 
	 * At this time the only commands expected to be supported are M L and Q all of which can be treated in a similar manner. 
	 * 
	 * @param param0 
	 */
	constructor(...[x=0, y=0, ...values]: number[]){
		super(x, y, ...values);
	}

	public setCmd(cmd: string){
		this.cmd = cmd;
		return this;
	}

	public setStringr(stringr: (pt: Point)=>string){
		this.stringr = stringr;
		return this;
	}
	/**
	 * Standardizes a pointish value to an array type.
	 * @param point 
	 * @returns 
	 */
	public standardize(point: Pointish, defaultValue: number=0){
		if(Array.isArray(point)) return [point[0] ?? defaultValue, point[1] ?? defaultValue];
		return [point, point]
	}

	/**
	 * As most operations will require a similar iteration method when applying different operations to the point values.
	 * 
	 * This iterates over each containing value and yields a tuple containing the index, the value of the pointish array and finally the value of the contained element. 
	 * 
	 * this may seem like a strange pattern however in cases where I use += or other ternary operators it is easier to read.
	 * @param point 
	 */
	public *eachWithArgs(point: Pointish, defaultValue?: number){
		const pt = this.standardize(point, defaultValue)
		for(let i=0; i<this.length; i++) yield [i, pt[i%2], this[i]];
	}

	/**
	 * Clone the values in the point but breaking reference to the exising point values.
	 * @returns 
	 */
	public clone(){ return new Point(...this); }

	/**
	 * Add the provided value(s) to the values contained.
	 * @param point 
	 * @returns 
	 */
	public add(point: Pointish){
		for(const [i, v] of this.eachWithArgs(point)) this[i] += v;
		return this;
	}

	/**
	 * Subtract the provided value(s) from the values contained.
	 * @param point 
	 * @returns 
	 */
	public subtract(point: Pointish){
		for(const [i, v] of this.eachWithArgs(point)) this[i] -= v;
		return this;
	}

	/**
	 * Multiply the values contained by the provided value(s)
	 * @param point 
	 * @returns 
	 */
	public multiply(point: Pointish){
		for(const [i, v] of this.eachWithArgs(point, 1)) this[i] *= v;
		return this;
	}

	/**
	 * Divide the values contained by the provided value(s)
	 * @param point 
	 * @returns 
	 */
	public divide(point: Pointish){
		for(const [i, v] of this.eachWithArgs(point, 1)) this[i] /= v;
		return this;
	}

	/**
	 * raise the values contained to the power of the provided value(s)
	 * @param point 
	 * @returns 
	 */
	public pow(point: Pointish){
		for(const [i, v] of this.eachWithArgs(point, 1)) this[i] **= v;
		return this;
	}

	/**
	 * Round all the values in the point down to a provided precision if no precision is provided it rounds down to the next whole number.
	 * @param precision 
	 * @returns 
	 */
	public floor(precision?: number){
		for(let i = 0; i<this.length; i++)this[i] = Arithmetic.floor(this[i], precision);
		return this;
	}

	/**
	 * Round all the values in the point up to the provided precision if no precision is provided it will round the numbers up to the next whole number.
	 * @param precision 
	 * @returns 
	 */
	public ceil(precision?: number){
		for(let i = 0; i<this.length; i++)this[i] = Arithmetic.ceil(this[i], precision);
		return this;
	}

	/**
	 * Round all the values in the point to the provided precision if no precision is provided it will round to the nearest whole number.
	 * @param precision 
	 * @returns 
	 */
	public round(precision?: number){
		for(let i = 0; i<this.length; i++)this[i] = Arithmetic.round(this[i], precision);
		return this;
	}

	/**
	 * Adds the first two values of the point together. 
	 * 
	 * Because of the necessity it should be noted that the first two values should be a control point to be used in measurements.
	 * @returns 
	 */
	public sum() { return this[0] + this[1]; }


	/**
	 * Update the point by casting a ray from the current position to a new point at a specified angle and distance.
	 * @param angle 
	 * @param distance 
	 */
	public ray(angle: number, distance: number){
		return this.add([
			distance * Math.sin(angle),
			distance * Math.cos(angle)
		]);
	}

	/**
	 * Measures the distance between a point and the provided point
	 * @param point 
	 * @returns 
	 */
	public distance(point: Pointish){
		const [x1, y1] = this;
		const [x2, y2] = this.standardize(point)
		return Math.sqrt((x2-x1)**2+(y2-y1)**2);
	}

	/**
	 * A specialized iterator designed to allow for a simplified iteration strategy when multiple biValues are contained in a point.
	 * @param defaultValue 
	 */
	public *bivalIterator(defaultValue: number = 0){
		for(let i = 0; i<this.length; i+=2) yield [this[i], this[i+1] ?? defaultValue]
	}

	public toString(): string {
		return `${this.cmd}${this.stringr(this)}`;
	}
}