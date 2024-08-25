import { bufferIterator, fromCircle, normalize, rotate, rounded, scale, translate } from "./iterators";
import { $d } from "./ngon";
import Point from "./Point";
import { round as roundNumber } from './arithmetic';
import { Rect, VertexGenerator } from "./types";
import RoundedCorner from "./RoundedCorner";


/**
 * A Vector generator is a reusable generator method.
 * 
 * Geometries and react components require reusable Generators. 
 * 
 * This allows for measuring and rerendinging appropriately.
 */

/**
 * Points uses generator methods to append actions to an iteration reducing the number of times a vertex list needs to be iterated.
 */
class Points {
	//this is a method  to reconst
	generator: VertexGenerator;
	center: Point = Point.zero;
	noClose: boolean
	constructor(points: number[] | VertexGenerator, noClose: boolean = false) {
		this.generator = Array.isArray(points) ? bufferIterator(points): (points as VertexGenerator);
		this.noClose = noClose;
	}

	get viewBox() {
		const [min, size] = this.measure();
		return $d`${min} ${size}`;
	}

	get aspectRatio(){
		const [, [w, h]] = this.measure();
		return `${roundNumber(w/h, 5)} / 1`
	}

	/**
	 * Returns a tuple such that the first string is the aspect ratio and the second string is a view box
	 */
	get viewInfo():[string, string]{
		const [min, [w,h]] = this.measure();
		return [
			w > h ? `${roundNumber(w/h, 3)} / 1`:`${roundNumber(h/w, 3)} / 1`,
			$d`${min} ${[w,h]}`
		]
	}

	/**
	 * Translate all points by a new position. This is effectively adding the new point to the center. 
	 * @param point 
	 * @returns 
	 */
	public translate(point:Point):Points {
		this.center.adding(point);
		this.generator = translate(this.generator, point);
		return this;
	}

	/**
	 * Rotates the points around a point by a specified radian
	 * @param angle 
	 * @param point - The point to rotate around assumes 0,0 if no point is provided
	 */
	public rotate(angle: number){
		this.generator = rotate(this.generator, angle, this.center);
		return this;
	}

	/**
	 * Scales the point by two a scale Factor Point
	 * @param scaleFactor 
	 * @returns 
	 */
	public scale(scaleFactor: Point){
		this.center.multiplying(scaleFactor);
		this.generator = scale(this.generator, scaleFactor);
		return this;
	}

	public normalize(bounds: Rect = this.measure()){
		
		this.center.subtracting(bounds[0]);
		console.log(this.center);
		this.generator = normalize(this.generator, bounds);
		return this;
	}

	/**
	 * Rounds each corner. This effectively multiplies the number of points by three. A side effect of this is the point order will be shifted forward by two.
	 * 
	 * The corner radius value can be a static number or an array of values. If an array is provided and there is not a value for a point then the corner radius will be assumed to be 0.
	 * 
	 * If you are rounding and unrounding points the shift of point order will be imporatnt to keep in mind if providing corner radius for each corner.
	 * @param cornerRadius 
	 */
	public round(cornerRadius: number | number[]){
		this.generator = rounded(this.generator, cornerRadius);
		return this;
	}

	/**
	 * Scale by a single scale factor 
	 * @param scalar 
	 * @returns 
	 */
	public scaleByScalar(scalar: number){
		const gen = this.generator;
		function* rotator(){
			for(const p of gen()) yield p.multiplyScalar(scalar);
		}
		this.generator = rotator;
		return this;
	}


	/**
	 * Measure the current generator
	 * @returns 
	 */
	public measure():Rect{
		let min = this.center;
		let max = this.center;
		for(const p of this.generator()){
			min = min.min(p);
			max = max.max(p);
		}
		return [min, max.subtract(min), max];
	}

	public toArray(){
		const array: (Point | RoundedCorner)[] = [];
		for(const point of this.generator()){
			array.push(point);
		}
		return array;
	}
	/**
	 * Representing points as a string will result in the path commands being generated.
	 * @returns 
	 */
	public toString(){
		let d = '';
		for(const p of this.generator()){
			const c = d ? ' L':'M';
			d += $d`${c} ${p}`;
		}
		return d+(this.noClose ? '':'z');
	}

	
	//Static methods

	/**
	 * Generates points by picking points around a circle.
	 * @param stops 
	 * @param rotation 
	 */
	public static fromCircle(stops: number, rotation: number=0, center: Point=Point.zero){
		return new Points(fromCircle(stops, rotation, center));
	}
};

export default Points