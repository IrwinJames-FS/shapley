import { round, toRad } from "./arithmetic";
import RoundedCorner from "./RoundedCorner";
import { SupportedPointMathTypes } from "./types";

/**
 * The point type is the basic unit used to create path commands in shapely.
 */
class Point extends Array<number>{
	

	constructor(x: number, y: number) {
		super(x, y);
	}

	/**
	 * The x property reads from the first entry of the array.
	 */
	get x(){return this[0]}
	set x(n:number){this[0] = n}

	/**
	 * The y property reads from the second entry of the array
	 */
	get y(){return this[1]}
	set y(n:number){this[1] = n}


	//this is a concession I am making for objects like rounded corners. and potential future special types. This allows the control point to be picked without redundant type checking
	get control(){
		return new Point(this.x, this.y);
	}

	/**
	 * Post MVP I will be moving to a explicit copy method. 
	 * 
	 * This will give the end user more granular control without having to have a robust arithmetic lexicon.
	 * @returns 
	 */
	public cp(){
		return new Point(this.x, this.y);
	}
	/**
	 * This method finds a point on a circle's circumference of the provided **radius** at the provided **angle**
	 * @param angle - The angle should be provided in radians.
	 * @param radius 
	 * @returns 
	 */
	public ray(angle: number, radius: number):Point{
		const p = new Point(
			radius * Math.sin(angle),
			radius * Math.cos(angle)
		).adding(this);
		return p;
	}

	/**
	 * This method finds a point on a circle's circumference of the provided **radius** at the provided **angle**
	 * @param angle - The angle should be provided in degrees
	 * @param radius 
	 */
	public rayDeg(angle: number, radius: number):Point{
		return this.ray(toRad(angle), radius);
	}

	/**
	 * Adds the current point to another
	 * @param point
	 * @returns 
	 */
	public add([x,y]: SupportedPointMathTypes):Point{
		return new Point(this.x + x, this.y + y);
	}

	/**
	 * Adds a provided value to the current value without creating a new Point
	 * @param param0 
	 * @returns 
	 */
	public adding([x,y]: SupportedPointMathTypes){
		this.x += x;
		this.y += y;
		return this;
	}

	/**
	 * Add a value to both coordinate values.
	 * @param n 
	 * @returns 
	 */
	public addScalar(n: number){
		return new Point(this.x + n, this.y + n);
	}

	/**
	 * Subtracts another point from this point
	 * @param point
	 * @returns 
	 */
	public subtract([x,y]: SupportedPointMathTypes){
		return new Point(this.x - x, this.y - y);
	}

	/**
	 * Subtracts another point from this point without creating a new Point.
	 */
	public subtracting([x,y]: SupportedPointMathTypes){
		this.x -= x;
		this.y -= y;
		return this;
	}

	/**
	 * Subtracts a value from both coordinate values.
	 * @param n 
	 * @returns 
	 */
	public subtractScalar(n: number){
		return new Point(this.x - n, this.y - n);
	}

	/**
	 * Multiply this point by another point
	 * @param point
	 * @returns 
	 */
	public multiply([x,y]: SupportedPointMathTypes){
		return new Point(this.x * x, this.y * y);
	}

	/**
	 * Multiplies the current point by another without making a new point
	 * @param point
	 */
	public multiplying([x,y]: SupportedPointMathTypes) {
		this.x *= x;
		this.y *= y;
		return this;
	}

	/**
	 * Multiplies the point by a single value.
	 * @param n 
	 * @returns 
	 */
	public multiplyScalar(n: number){
		return new Point(this.x * n, this.y * n);
	}

	/**
	 * Divide this point by another point
	 * @param point
	 * @returns 
	 */
	public divide([x,y]: SupportedPointMathTypes){
		return new Point(this.x / x, this.y / y);
	}

	/**
	 * Divide this point by another point without making a new point
	 * @param point
	 * @returns 
	 */
	public dividing([x,y]: SupportedPointMathTypes){
		this.x /= x;
		this.y /= y;
		return this;
	}

	/**
	 * Divides the point by a single value.
	 * @param n 
	 * @returns 
	 */
	public divideScalar(n: number){
		return new Point(this.x / n, this.y / n);
	}

	/**
	 * Returns a point that contains the smallest values between the provided point and this point.
	 * @param param0 
	 * @returns 
	 */
	public min([x, y]: SupportedPointMathTypes | RoundedCorner){
		return new Point(
			Math.min(this.x, x),
			Math.min(this.y, y)
		)
	}

	/**
	 * Returns a point that contains the largest values between the provided point and this point.
	 * @param param0 
	 * @returns 
	 */
	public max([x, y]: SupportedPointMathTypes | RoundedCorner){
		return new Point(
			Math.max(this.x, x),
			Math.max(this.y, y)
		)
	}

	/**
	 * This method offers a way to round the values for x and y to a specific precision level. This is helpful in SSR as server side precision is usually different from client side.
	 * 
	 * This method mutates the existing values
	 * @param prec 
	 */
	public precision(prec: number){
		this.x = round(this.x, prec);
		this.y = round(this.y, prec);
		return this;
	}

	/**
	 * Calculates the angle and distance to the provided point
	 * @param point 
	 */
	public to([x, y]: SupportedPointMathTypes){
		const dx = x-this.x;
		const dy = y-this.y;
		return {
			angle: Math.atan2(dx,dy), //inversed
			distance: Math.sqrt(dx**2+dy**2)
		}
	}

	/**
	 * Calculates the angle and distance from a provided point to this point
	 * @param param0 
	 * @returns 
	 */
	public from([x, y]: SupportedPointMathTypes) {
		const dx = this.x-x;
		const dy = this.y-y;
		return {
			angle: Math.atan2(dx, dy),
			distance: Math.sqrt(dx**2+dy**2)
		}
	}
	/**
	 * Rotates a point around another point.
	 * @param point 
	 * @param angle 
	 * @returns 
	 */
	public rotateAround(point: SupportedPointMathTypes, angle:number){
		const {angle:a, distance} = this.from(point);
		return this.ray(a+angle, distance);
	}

	/**
	 * If an aspect ratio is defined as width / height then a point can be treated as a fraction. More to the point fractions can be simplified which should be more desirable then current method of calculating a css aspect ratio.
	 */
	public simplify(){
		const gcd = (a: number, b: number):number => b===0 ? a:gcd(b, a%b);
		const divisor = gcd(this.x, this.y);
		const p = this.cp().divideScalar(divisor);
		console.log('Simplified', p.x, p.y)
		return p;
	}
	/*
	Type Casting
	*/

	/**
	 * This Class converts itself to a comma separated string. x, y and fixes the precision to 5 decimal points. 
	 */
	public toString():string { return Point.toString(this)}

	/**
	 * Returns the x and y values in an array.
	 */
	public toArray(){return [this.x, this.y]}
	//Static methods

	/*
	STATIC METHODS
	*/
	
	/**
	 * A convenience method to initialize a point at origin.
	 */
	static get zero(){
		return new Point(0, 0);
	}

	/** Just a shortcut to initialize rather then needing to write new in a oneLiner */
	static px(x: number, y: number) {
		return new Point(x, y);
	}

	/**
	 * With the two string method also being applicable to arrays this can replicate the Point toString functionality on other array types assuming the first two elements are the x and y coordinates. 
	 * @param param0 
	 * @param prec 
	 * @returns 
	 */
	static toString([x, y]: SupportedPointMathTypes, prec:number = 5):string {
		return `${round(x, prec)}, ${round(y, prec)}`
	}
}

export default Point;