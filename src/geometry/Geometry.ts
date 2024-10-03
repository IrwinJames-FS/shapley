import { Point } from "./Point";
import { GeometryGenerator, GeometryMutator, Pointish } from "./types";

export class Geometry {
	/**
	 * Instead of storing an array a function which generates Points is expected. This is beneficial as thise generators can be combined only resulting in operations being added to the render loop without additional iterations through the points.
	 */
	generator: GeometryGenerator
	autoClose: boolean = true
	constructor(gen: GeometryGenerator){
		this.generator = gen;
	}

	/**
	 * Clone the existing points
	 * @returns 
	 */
	public clonePoints(){ return this.appendGenerator(Geometry.cloneMutator); }

	/**
	 * Translate the existing points to a specified position.
	 * @param pt 
	 * @returns 
	 */
	public translate(point: Pointish){ return this.appendGenerator(Geometry.translateMutator(point)); }


	public scale(point: Pointish) { return this.appendGenerator(Geometry.scaleMutator(point)); }


	/**
	 * This method returns an array of points
	 * @returns 
	 */
	public toPoints(){
		return Array.from(this.generator());
	}

	/**
	 * Similar to the toPoints method this method will return an array of arrays that do not reference a points instance. 
	 */
	public toArrays(){
		return this.toPoints().map(v=>[...v]);
	}
	/**
	 * Adds a mutator to the generators loop this can be used to add translation or scale operations this can also be used to append or filter points from the render as well.
	 * @param gen 
	 * @returns 
	 */
	public appendGenerator(gen: GeometryMutator){
		const g = gen(this.generator);
		this.generator = g;
		return this;
	}

	public floor(precision?: number){
		return this.appendGenerator(Geometry.floorMutator(precision));
	}

	public ceil(precision?: number){
		return this.appendGenerator(Geometry.ceilMutator(precision));
	}

	public setAutoClose(close: boolean = true){
		this.autoClose = close;
		return this;
	}
	public toString(){
		const gen = this.generator();
		const first = gen.next().value;
		if(!first) return "";
		let cmd = ""+first.setCmd("M")
		for(const p of gen){
			cmd += ' ' + p;
		}
		return cmd+(this.autoClose ? 'z':'');
	}

	public round(precision?: number){
		return this.appendGenerator(Geometry.roundMutator(precision));
	}

	static fromBuffer(points: number[]) {
		return new Geometry(Geometry.bufferGenerator(points));
	}

	static fromPoints(points: Point[]){
		return new Geometry(Geometry.pointGenerator(points));
	}

	static fromCircle(stops: number, rotation?: number, radius?: number, center?: Point){
		return new Geometry(Geometry.circleGenerator(stops, rotation, radius, center));
	}
	/**
	 * This buffer allows for the static declaration of points similar to how a vertex buffer is created in a 3d model.
	 * @param points 
	 * @returns 
	 */
	static bufferGenerator(points: number[]){
		if(points.length % 2 !== 0) throw new Error("Invalid buffer length");
		return function*(){
			for(let i = 0; i<points.length; i+=2) yield new Point(points[i], points[i+1]);
		}
	}

	/**
	 * Generates points by picking them from the circumference of a circle.
	 * @param stops 
	 * @param radius 
	 * @param center 
	 */
	static circleGenerator(stops: number, rotation: number=0, radius:number=0.5, center:Point=new Point(0,0)){
		const delta = (Math.PI*2)/stops;
		return function*(){
			for(let i = 0; i<stops;i++)yield center.clone().ray((delta*i)+rotation, radius);
		}
	}

	/**
	 * The Points generator is a generator that iterates over a static list of points and renders them. additionally this can have unexpected results if math is performed on the source point repeatedly.
	 * @param points 
	 * @returns 
	 */
	static pointGenerator(points: Point[]){
		return function*(){
			for(const point of points) yield point;
		}
	}

	/**
	 * Similar to a poiint generator this generator method will clone each point before performing subsequent iterations this will prevent math from being performed multiple times on the same reference.
	 * @param points 
	 */
	static clonedPointGenerator(points: Point[]){
		return function*(){
			for(const point of points) yield point.clone();
		}
	}

	/**
	 * Creates clones the points value while breaking reference to the previous instance. 
	 * @param gen 
	 * @returns 
	 */
	static cloneMutator(gen: GeometryGenerator){ return function*(){ for (const p of gen()) yield p.clone(); }}


	/**
	 * Translate the generators current point values to a new position
	 * 
	 * This is simply utilizing the Points add method to create an affine transformation.
	 * 
	 * This method directly mutates the point reference. if the reference point is statically declared this may result in multiple operations being performed on the same reference if the operation is performed each redraw.
	 * @param gen 
	 */
	static translateMutator(point: Pointish){
		return (gen: GeometryGenerator)=>function*(){ for(const p of gen()) yield p.add(point); }
	}

	/**
	 * Scale the generators current point values to a new position
	 * 
	 * This utilizes the points multiply method. 
	 * 
	 * This method directly mutates the point reference. if the reference point is statically declared this may result in multiple operations being performed on the same reference if the operation is performed each redraw.
	 * @param point 
	 * @returns 
	 */
	static scaleMutator(point: Pointish):GeometryMutator{
		return gen=>function*(){ for(const p of gen()) yield p.multiply(point); }
	}

	static floorMutator(precision?: number):GeometryMutator{
		return gen=>function*(){ for (const p of gen()) yield p.floor(precision); }
	}

	static ceilMutator(precision?: number):GeometryMutator{
		return gen=>function*(){ for (const p of gen()) yield p.ceil(precision); }
	}

	static roundMutator(precision?: number):GeometryMutator{
		return gen=>function*(){ for (const p of gen()) yield p.round(precision); }
	}
}