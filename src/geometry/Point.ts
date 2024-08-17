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
	get x(){return this[0]}
	set x(n:number){this[0] = n}
	get y(){return this[1]}
	set y(n:number){this[1] = n}


	//this is a concession I am making for objects like rounded corners. and potential future special types. This allows the control point to be picked without redundant type checking
	get control(){
		return this;
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
	rayDeg(angle: number, radius: number):Point{
		return this.ray(toRad(angle), radius);
	}

	/**
	 * Adds the current point to another
	 * @param point
	 * @returns 
	 */
	public add([x,y]: SupportedPointMathTypes){
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
	 * Subtracts another point from this point
	 * @param point
	 * @returns 
	 */
	public subtract([x,y]: SupportedPointMathTypes){
		return new Point(this.x - x, this.y - y);
	}

	public subtracting([x,y]: SupportedPointMathTypes){
		this.x -= x;
		this.y -= y;
		return this;
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
	 * Add a value to both coordinate values.
	 * @param n 
	 * @returns 
	 */
	addScalar(n: number){
		return new Point(this.x + n, this.y + n);
	}

	/**
	 * Subtracts a value from both coordinate values.
	 * @param n 
	 * @returns 
	 */
	subtractScalar(n: number){
		return new Point(this.x - n, this.y - n);
	}

	/**
	 * Multiplies the point by a single value.
	 * @param n 
	 * @returns 
	 */
	multiplyScalar(n: number){
		return new Point(this.x * n, this.y * n);
	}

	/**
	 * Divides the point by a single value.
	 * @param n 
	 * @returns 
	 */
	divideScalar(n: number){
		return new Point(this.x / n, this.y / n);
	}

	min([x, y]: SupportedPointMathTypes | RoundedCorner){
		return new Point(
			Math.min(this.x, x),
			Math.min(this.y, y)
		)
	}

	max([x, y]: SupportedPointMathTypes | RoundedCorner){
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
	precision(prec: number){
		this.x = round(this.x, prec);
		this.y = round(this.y, prec);
		return this;
	}
	/**
	 * Get the info needed to plot a ray to a point.
	 * This is typically used in rotation methods to rotate around a point
	 * @param point 
	 */
	to([x, y]: SupportedPointMathTypes){
		const dx = x-this.x;
		const dy = y-this.y;
		return {
			angle: Math.atan2(dx,dy), //inversed
			distance: Math.sqrt(dx**2+dy**2)
		}
	}

	from([x, y]: SupportedPointMathTypes) {
		const dx = this.x-x;
		const dy = this.y-y;
		return {
			angle: Math.atan2(dx, dy),
			distance: Math.sqrt(dx**2+dy**2)
		}
	}
	/**
	 * Rotates a point around another point
	 * @param point 
	 * @param angle 
	 * @returns 
	 */
	rotateAround(point: SupportedPointMathTypes, angle:number){
		const {angle:a, distance} = this.from(point);
		return this.ray(a+angle, distance);
	}

	toString():string { return Point.toString(this)}
	//Static methods

	
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

	static toString([x, y]: SupportedPointMathTypes, prec:number = 5):string {
		return `${round(x, prec)}, ${round(y, prec)}`
	}
}

export default Point;