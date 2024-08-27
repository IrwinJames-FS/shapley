import Point from "./Point";
import { SupportedPointMathTypes } from "./types";

/**
 * The rounded corner is sort of an alias class to Q the SVG path. This class allows for the stringification using Q instead of L.
 * Unlike point when Stringified this method provides the starting x and y point then a Q command curving xy to ex and ey.
 * 
 * Currently RoundedCorner does not replicate the full range of math from the 
 */
class RoundedCorner extends Array<number> {
	get x(){return this[0]}
	set x(n: number){this[0] = n}
	get y(){return this[1]}
	set y(n: number){this[1] = n}

	get sx(){return this[2]}
	set sx(n: number){this[2] = n}
	get sy(){return this[3]}
	set sy(n: number){this[3] = n}

	get ex(){return this[4]}
	set ex(n: number){this[4] = n}
	get ey(){return this[5]}
	set ey(n: number){this[5] = n}

	/**
	 * Creates a Point from the x and y control coordinates (the first two points in the array).
	 */
	get control(){return new Point(this.x, this.y);}

	/**
	 * Stores the *start*, *control*, and *end* points to a flat array.
	 * 
	 * This method accepts both the **Point** class as well as arrays for the arguments. 
	 * @param param0 
	 * @param param1 
	 * @param param2 
	 */
	constructor([sx, sy]: SupportedPointMathTypes, [x,y]: SupportedPointMathTypes, [ex, ey]: SupportedPointMathTypes){
		super(x, y, sx, sy, ex,ey)
	}

	/**
	 * Adds the x and y values of the provided **Point** or **array** to the three stored points
	 * @param param0 
	 * @returns 
	 */
	add([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx + x, this.sy + y],
			[this.x + x, this.y + y],
			[this.ex + x, this.ey + y]
		)
	}

	/**
	 * Subtracts the x and y values of the provided **Point** or **array** from the three stored points.
	 * @param param0 
	 * @returns 
	 */
	subtract([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx - x, this.sy - y],
			[this.x - x, this.y - y],
			[this.ex - x, this.ey - y]
		)
	}

	/**
	 * Multiplies the x and y values of the provided **Point** or **array** from the three stored points.
	 * @param param0 
	 * @returns 
	 */
	multiply([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx * x, this.sy * y],
			[this.x * x, this.y * y],
			[this.ex * x, this.ey * y]
		)
	}

	/**
	 * Multiplies the three stored points by the provided scalar value.
	 * @param n 
	 * @returns 
	 */
	multiplyScalar(n: number){
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
	divide([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx / x, this.sy / y],
			[this.x / x, this.y / y],
			[this.ex / x, this.ey / y]
		)
	}

	/**
	 * Rotates the three stored points around a provided **Point** or **array** by a provided angle.
	 * @param point 
	 * @param angle 
	 * @returns 
	 */
	rotateAround(point: SupportedPointMathTypes, angle:number){
		return new RoundedCorner(
			Point.px(this.sx, this.sy).rotateAround(point, angle),
			Point.px(this.x, this.y).rotateAround(point, angle),
			Point.px(this.ex, this.ey).rotateAround(point, angle)
		)
	}

	/**
	 * Converts the three points into an initial point and a Subsequent Q Command to curve a corner.
	 * @returns 
	 */
	toString(){ return `${Point.toString([this.sx, this.sy])} Q ${Point.toString([this.x, this.y])} ${Point.toString([this.ex, this.ey])}`;}

	/**
	 * Returns a flat array of points essencially ejecting the values. 
	 * @returns 
	 */
	toArray(){ return [this.x, this.y, this.sx, this.sy, this.ex, this.ey] }
}

export default RoundedCorner;