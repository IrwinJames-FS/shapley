import { round } from "./arithmetic";
import Point from "./Point";
import { SupportedPointMathTypes } from "./types";

/**
 * The rounded corner is sort of an alias class to Q the SVG path. This class allows for the stringification using Q instead of L.
 * Unlike point when Stringified this method provides the starting x and y point then a Q command curving xy to ex and ey.
 * 
 * Currently RoundedCorner does not replicate the full range of math from the 
 */
class RoundedCorner extends Point {

	/**
	 * The starting x value of the curve.
	 */
	get sx(){return this[2]}
	set sx(n: number){this[2] = n}

	/**
	 * The starting y value of the curve.
	 */
	get sy(){return this[3]}
	set sy(n: number){this[3] = n}

	/**
	 * The ending x value of the curve.
	 */
	get ex(){return this[4]}
	set ex(n: number){this[4] = n}

	/**
	 * The ending y value of the curve.
	 */
	get ey(){return this[5]}
	set ey(n: number){this[5] = n}

	/**
	 * Stores the *start*, *control*, and *end* points to a flat array.
	 * 
	 * This method accepts both the **Point** class as well as arrays for the arguments. 
	 * @param param0 
	 * @param param1 
	 * @param param2 
	 */
	constructor([sx, sy]: SupportedPointMathTypes, [x,y]: SupportedPointMathTypes, [ex, ey]: SupportedPointMathTypes){
		super(x, y)
		this.push(sx, sy, ex, ey);
	}

	/**
	 * Adds the x and y values of the provided **Point** or **array** to the three stored points
	 * @param param0 
	 * @returns 
	 */
	override add([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx + x, this.sy + y],
			[this.x + x, this.y + y],
			[this.ex + x, this.ey + y]
		)
	}

	/**
	 * Adds the x and y values of the provided **Point** or **array** to the the three stored points.
	 * @param param0 
	 * @returns 
	 */
	override adding([x,y]:SupportedPointMathTypes){
		this.x += x;
		this.sx += x;
		this.ex += x;

		this.y += y;
		this.sy += y;
		this.ey += y;
		return this;
	}

	/**
	 * Adds a single value to all the points stored in the **RoundedCorner**.
	 * @param n 
	 * @returns 
	 */
	override addScalar(n: number) {
		return this.add([n,n]);
	}

	/**
	 * Subtracts the x and y values of the provided **Point** or **array** from the three stored points.
	 * @param param0 
	 * @returns 
	 */
	override subtract([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx - x, this.sy - y],
			[this.x - x, this.y - y],
			[this.ex - x, this.ey - y]
		)
	}

	/**
	 * Subtracts the **x** and **y** values provided from the points stored in the **RoundedCorner**
	 * @param param0 
	 * @returns 
	 */
	override subtracting([x, y]: SupportedPointMathTypes) {
		this.x -= x;
		this.sx -= x;
		this.ex -= x;

		this.y -= y;
		this.sy -= y;
		this.ey -= y;
		return this;
	}

	/**
	 * Subtracts the **x** and **y** values provided from the points stored in the **RoundedCorner**
	 * @param n 
	 * @returns 
	 */
	override subtractScalar(n: number) {
		return this.subtract([n,n]);
	}

	/**
	 * Multiplies the x and y values of the provided **Point** or **array** from the three stored points.
	 * @param param0 
	 * @returns 
	 */
	override multiply([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx * x, this.sy * y],
			[this.x * x, this.y * y],
			[this.ex * x, this.ey * y]
		)
	}

	/**
	 * Multiplies the **x** and **y** values of the provided **Point** or **array** by the three stored points.
	 * @param param0 
	 * @returns 
	 */
	override multiplying([x, y]: SupportedPointMathTypes) {
		this.x *= x;
		this.sx *= x;
		this.ex *= x;

		this.y *= y;
		this.sy *= y;
		this.ey *= y;
		return this;
	}
	
	/**
	 * Multiplies the three stored points by the provided scalar value.
	 * @param n 
	 * @returns 
	 */
	override multiplyScalar(n: number){
		return new RoundedCorner(
			[this.sx * n, this.sy * n],
			[this.x * n, this.y * n],
			[this.ex * n, this.ey * n]
		)
	}

	/**
	 * Divides three stored points by the x and y values of the provided **Point** or **array**
	 * @param param0 
	 * @returns 
	 */
	override divide([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx / x, this.sy / y],
			[this.x / x, this.y / y],
			[this.ex / x, this.ey / y]
		)
	}

	/**
	 * Divides the stored points by the **x** and **y** values of the provided **Point** or **array** without creating an instance.
	 * @param param0 
	 * @returns 
	 */
	override dividing([x, y]: SupportedPointMathTypes) {
		this.x /= x;
		this.sx /= x;
		this.ex /= x;

		this.y /= y;
		this.sy /= y;
		this.ey /= y;
		return this;
	}

	/**
	 * Divides the stored points by the **x** and **y** values provided by the **Point** or **array**.
	 * @param n 
	 * @returns 
	 */
	override divideScalar(n: number) {
		return this.divide([n,n]);
	}

	/**
	 * Rotates the three stored points around a provided **Point** or **array** by a provided angle.
	 * @param point 
	 * @param angle 
	 * @returns 
	 */
	override rotateAround(point: SupportedPointMathTypes, angle:number){
		return new RoundedCorner(
			Point.px(this.sx, this.sy).rotateAround(point, angle),
			Point.px(this.x, this.y).rotateAround(point, angle),
			Point.px(this.ex, this.ey).rotateAround(point, angle)
		)
	}

	override precision(prec: number) {
		this.x = round(this.x, prec);
		this.y = round(this.y, prec);
		this.sx = round(this.sx, prec);
		this.sy = round(this.sy, prec);
		this.ex = round(this.ex, prec);
		this.ey = round(this.ey, prec);
		return this;
	}

	/**
	 * Converts the three points into an initial point and a Subsequent Q Command to curve a corner.
	 * @returns 
	 */
	override toString(){ return `${Point.toString([this.sx, this.sy])} Q ${Point.toString([this.x, this.y])} ${Point.toString([this.ex, this.ey])}`;}

	/**
	 * Returns a flat array of points essencially ejecting the values. 
	 * @returns 
	 */
	override toArray(){ return [this.x, this.y, this.sx, this.sy, this.ex, this.ey] }
}

export default RoundedCorner;