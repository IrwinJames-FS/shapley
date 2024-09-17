import { Pointish } from "./types";
import Arithmetic from './arithmetic';

/**
 * The point class will act as a base class for most path based commands. With each being converted into a class structure which can be consumed by a generational type.
 * 
 * This is a general use type. While its first goal is to create an interface to easily create and mutate path commands within an SVG path. The Point class also contains methods allowing one to interact with the values as if it were a fraction.
 * 
 * All mathematical methods by default modify this instance before returning a reference to this instance.
 */
export class Point extends Array<number> {
	cmd: string
	constructor(x: number=0, y: number=0, cmd: string = "L"){
		super(x, y);
		this.cmd = cmd;
	}

	/**
	 * x is always the first position of a point instance. in classes that inherit this class this practice must be followed as well.
	 */
	get x(){
		return this[0];
	}

	set x(n:number){
		this[0] = n;
	}

	/**
	 * y is always the first position of a point instance. in classes that inherit this class this practice must be followed as well.
	 */
	get y(){
		return this[1];
	}

	set y(n: number){
		this[1] = n;
	}

	/**
	 * Throughout the Point class I will use the Pointish alias which accepts Points, number array, and singular numbers.
	 * 
	 * Later the the Pointish method may also include other types.
	 * 
	 * to maintain a dry pattern it makes sense to standardize the way this argument is handled.
	 * 
	 * Currently if an array or Point instance is provided that is returned.
	 * 
	 * If the value is a number that number will be duplicated and used for both the x an y values.
	 * @param point 
	 * @returns 
	 */
	private standardize(point: Pointish){ return typeof point === 'number' ? [point, point]:point}

	/**
	 * Clones the point any inheriting class will need to override this method. 
	 * @returns 
	 */
	public clone(cmd?:string){
		return new Point(this.x, this.y, ''+(cmd ?? this.cmd));
	}

	/**
	 * Add a point to this instance. 
	 * 
	 * If a singular value is provided it will be applied to all the values.
	 * 
	 * If an array or Point class is provided x and y will be added to contained values assuming values are added in [..., x, y] pattern. 
	 * 
	 * If an array or Point that does not contain at least two points missing values will be assumed as 0.
	 * @param pt 
	 * @returns 
	 */
	public add(point:Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i < this.length; i++){
			this[i] += pt[i%2] ?? 0;
		}
		return this;
	}

	/**
	 * Subtracts a point from this instance
	 * If a singular value is provided it will be applied to all the values.
	 * 
	 * If an array or Point class is provided x and y will be subtracted from the contained values assuming values are added in [..., x, y] pattern. 
	 * 
	 * If an array or Point that does not contain at least two points missing values will be assumed as 0.
	 * @param pt 
	 * @returns 
	 */
	public subtract(point: Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i < this.length; i++){
			this[i] -= pt[i%2] ?? 0;
		}
		return this;
	}

	/**
	 * Multiplies this instance by a provided point
	 * If a singular value is provided it will be applied to all the values.
	 * 
	 * If an array or Point class is provided the contained values will be multipled by the provided x and y values assuming values are added in [..., x, y] pattern. 
	 * 
	 * If an array or Point that does not contain at least two points missing values will be assumed as 1.
	 * @param point 
	 * @returns 
	 */
	public multiply(point: Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i < this.length; i++){
			this[i] *= pt[i%2] ?? 1;
		}
		return this;
	}

	/**
	 * Divides this instance by a provided point
	 * If a singular value is provided it will be applied to all the values.
	 * 
	 * If an array or Point class is provided the contained values will be divided by the provided x and y values assuming values are added in [..., x, y] pattern. 
	 * 
	 * If an array or Point that does not contain at least two points missing values will be assumed as 1.
	 * @param point 
	 * @returns 
	 */
	public divide(point: Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i < this.length; i++){
			this[i] /= pt[i%2] ?? 1;
		}
		return this;
	}

	/**
	 * Increase the values by the power ofthe values provided.
	 * @param point 
	 * @returns 
	 */
	public pow(point: Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i<this.length; i++){
			this[i] = Math.pow(this[i], pt[i%2] ?? 1);
		}
		return this;
	}

	/**
	 * Find the sum of the point
	 * @returns 
	 */
	public sum(){ return this.x + this.y; }

	/**
	 * Replace the existing points with the provided point values if the value is less then its respective value within the instance.
	 * @param point 
	 * @returns 
	 */
	public min(point: Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i<this.length; i++){
			this[i] = Math.min(this[i], pt[i%2] ?? 0);
		}
		return this;
	}

	/**
	 * Replace the existing points with the provided point values if the value is less then its respective value within the instance.
	 * @param point 
	 * @returns 
	 */
	public max(point: Pointish){
		const pt = this.standardize(point);
		for(let i = 0; i<this.length; i++){
			this[i] = Math.max(this[i], pt[i%2] ?? 0);
		}
		return this;
	}

	/**
	 * Rounds down at a provided precision. this is helpful to reduce the difference in calculation between server side and client side.
	 * For example calling this on [3.14,3.59] would return different results based on precision.
	 * - precision 0: [3, 3]
	 * - precision 1: [3.1, 3.5]
	 * - precision 2: [3.14, 3.59]
	 * 
	 * using this is it possible to limit decimal precsion.
	 * @param precision 
	 * @returns 
	 */
	public floor(precision?:number) {
		for(let i = 0; i<this.length; i++){
			this[i] = Arithmetic.floor(this[i], precision);
		}
		return this;
	}

	/**
	 * Rounds the value up at the desired precision
	 * @param precision 
	 */
	public ceil(precision?: number){
		for(let i = 0; i<this.length;i++){
			this[i] = Arithmetic.ceil(this[i], precision);
		}
		return this;
	}

	/**
	 * Rounds the value to the nearest provided precision.
	 * @param precision 
	 */
	public round(precision?: number){
		for(let i = 0; i<this.length;i++){
			this[i] = Arithmetic.round(this[i], precision);
		}
		return this;
	}

	public setPosition(point: Pointish){
		const [x=0,y=0] = this.standardize(point);
		this.x = x;
		this.y = y;
		return this;
	}

	/**
	 * To string turns points to path commands. 
	 * 
	 * This method assumes that x and y are the only defined values if additional values have been added to this array they will be ignored.
	 * 
	 * Additionally if extending the Point class to invoke a different Path command format the toString method will need to be overriden
	 * @returns 
	 */
	public toString(){
		return `${this.cmd} ${this.x}, ${this.y}`;
	}

	/**
	 * Converts a Point instance to an array. 
	 * 
	 * because the Point class extends an array this will effectively remove the custom methods offered by point from the prototype. 
	 * @returns 
	 */
	public toArray():number[]{ return [...this]};

	/**
	 * Moves the point to a point derived by casting a ray to a specified angle and radius. 
	 * @param angle 
	 * @param radius 
	 * @returns 
	 */
	public ray(angle: number, radius: number){
		this.x += radius * Math.sin(angle);
		this.y += radius * Math.cos(angle);
		return this;
	}

	/**
	 * Finds the angle from this point to the provided point
	 * @param point 
	 * @returns 
	 */
	public angle(point: Pointish){ 
		const [x=0,y=0] = this.standardize(point)
		return Math.atan2(x-this.x,y-this.y);
	}

	/**
	 * Finds the distance between the provided point and this point
	 * @param point 
	 */
	public distance(point: Pointish){
		const [x=0, y=0] = this.standardize(point);
		return Math.sqrt(this.clone().subtract(point).pow(2).sum());
	}

	/**
	 * Rotates a the instance around a provided point by an offset radian. 
	 * @param point 
	 * @param offset 
	 * @returns 
	 */
	public rotateAround(point: Pointish, offset: number){
		const [x, y] = this.standardize(point);
		const pt = new Point(x, y, this.cmd);
		const angle = this.angle(pt) + Math.PI;
		const distance = pt.distance(this);
		return this.setPosition(pt.ray(angle+offset, distance));
	}
	/**
	 * Checks if the provided value is equal in spacial location as a the instance. 
	 * @param point 
	 * @returns 
	 */
	public equals(point: Pointish){
		const [x=0, y=0] = this.standardize(point);
		return this.x===x && this.y===y;
	}

	/**
	 * Simplifies a point to its smallest hole number
	 * @returns 
	 */
	public simplify(){
		const gcd = (a: number, b:number):number => b===0 ? a:gcd(b, a%b);
		return this.divide(gcd(this.x, this.y));
	}

	/** Just a convenience method to initialize a zero point */
	static zero(cmd?:string){
		return new Point(0, 0, cmd);
	}


}