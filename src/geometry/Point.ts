import { Pointish } from "./types";

/**
 * The point class is essencially a two value tuple (x,y) that offers a few convenience methods to simplify arithmetic.
 * 
 * It should be noted any additional values added to a point will be ignored.
 * 
 */
export class Point extends Array<number> {
	get x(){ return this[0]; }
	set x(value: number) { this[0] = value; }

	get y() { return this[1]; }
	set y(value: number) { this[1] = value; }

	constructor(x: number = 0, y: number = 0){
		super(x,y);
	}

	copy() { return new Point(this[0], this[1]); }

	/*
	Arithmetic
	*/

	/**
	 * Add the provided value to the current point. 
	 * 
	 * If a single value is provided the value will be added to both x and y. 
	 * 
	 * If an array or Point is added the first value will be added to x and the second to y.
	 * @param value 
	 * @returns 
	 */
	add(value: Pointish){
		if(typeof value === 'number'){
			this[0] += value;
			this[1] += value;
		} else {
			this[0] += value[0];
			this[1] += value[1];
		}
		return this;
	}

	/**
	 * Subtracts the provided value from the current point.
	 * 
	 * If a number is provided the value will be subtracted from both x and y.
	 * 
	 * If an array or Point is subtracted the first value will be subtracted from x and the second from y.
	 * @param value 
	 * @returns 
	 */
	subtract(value: Pointish){
		if(typeof value === 'number'){
			this[0] -= value;
			this[1] -= value;
		} else {
			this[0] -= value[0];
			this[1] -= value[1];
		}
		return this;
	}

	/**
	 * Multiplies the current values by the provided value.
	 * 
	 * If a number is provided the x and y values will both be multipled by the provided value.
	 * 
	 * If an array or Point is provided the x value will be multipled by the first value and y by the second. 
	 * @param value 
	 */
	multiply(value: Pointish){
		if(typeof value === 'number'){
			this[0] *= value;
			this[1] *= value;
		} else {
			this[0] *= value[0];
			this[1] *= value[1];
		}
		return this;
	}

	/**
	 * Divides the current values by the provided value.
	 * 
	 * If a number is provided both x and y values will be divided by the provided value.
	 * 
	 * If an array or Point is provided the x value will be divided by the first value and y by the second. 
	 * @param value 
	 */
	divide(value: Pointish){
		if(typeof value === 'number'){
			this[0] /= value;
			this[1] /= value;
		} else {
			this[0] /= value[0];
			this[1] /= value[1];
		}
		return this;
	}

	/**
	 * Replaces the current values if the respective provided value is less then the current.
	 * @param value 
	 * @returns 
	 */
	min(value: Pointish){
		if(typeof value === 'number'){
			this[0] = Math.min(this[0], value);
			this[1] = Math.min(this[1], value);
		} else {
			this[0] = Math.min(this[0], value[0]);
			this[1] = Math.min(this[1], value[1]);
		}
		return this;
	}

	/**
	 * Replaces the current values if the respective provided value is more then the current.
	 * @param value 
	 */
	max(value: Pointish){
		if(typeof value === 'number'){
			this[0] = Math.max(this[0], value);
			this[1] = Math.max(this[1], value);
		} else {
			this[0] = Math.max(this[0], value[0]);
			this[1] = Math.max(this[1], value[1]);
		}
		return this;
	}

	/**
	 * Casts a ray from the current point. This method always returns a new Point instance
	 * @param angle 
	 * @param distance 
	 * @returns 
	 */
	ray(angle: number, distance: number = 50){
		return new Point(
			distance * Math.sin(angle) + this[0],
			distance * Math.cos(angle) + this[1]
		);
	}

	/**
	 * Determines the angle to the provided point and distance. 
	 * @param value 
	 * @returns 
	 */
	to(value: Pointish): [number, number]{
		return typeof value === 'number' ? [
			Math.atan2(value-this[0], value-this[1]),
			Math.sqrt(Math.pow(value-this[0],2)+Math.pow(value-this[1], 2))
		]:[
			Math.atan2(value[0]-this[0], value[1]-this[1]),
			Math.sqrt(Math.pow(value[0]-this[0], 2) + Math.pow(value[1]-this[1],2))
		]
	}
}