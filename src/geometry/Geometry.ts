import { Point } from "./Point";
import { GeometryGenerator, GeometryMutationGenerator, Pointish } from "./types";

/**
 * This convenience method simply represents 360 degrees in radians. 
 */
export const CIRCLE = Math.PI*2;

/**
 * The Geometry class creates an interface to make geometries using js Generator methods.
 */
export class Geometry {
	geometry: GeometryGenerator

	constructor(geometry: GeometryGenerator){
		this.geometry = geometry;
	}

	public clone(){
		return new Geometry(this.geometry);
	}

	/**
	 * Applies an operation to the render cycle that will round all values down to a specific precision.
	 * @param precision 
	 * @returns 
	 */
	public floor(precision?: number){ return this.applyGenerator(Geometry.FloorMutator(precision)); }

	/**
	 * Applies an operation to the render cycle that will round all the values up at a provided precision.
	 * @param precision 
	 * @returns 
	 */
	public ceil(precision?: number){ return this.applyGenerator(Geometry.CeilMutator(precision)); }

	/**
	 * Applies an operation to the render cycle that will round all the values at a provided precision.
	 * @param precision 
	 * @returns 
	 */
	public round(precision?: number){ return this.applyGenerator(Geometry.RoundMutator(precision)); }


	/**
	 * Applies a translation operation to the render cycle.
	 * @param delta 
	 * @returns 
	 */
	public translate(delta: Pointish){ return this.applyGenerator(Geometry.TranslateMutator(delta)) }

	/**
	 * Applies a scale operation to the render cycle
	 * @param delta 
	 * @returns 
	 */
	public scale(delta: Pointish){ return this.applyGenerator(Geometry.ScaleMutator(delta)); }

	/**
	 * Rotates the existing points in the Geometry around a provided point by a provided offset radian.
	 * @param center 
	 * @param offset 
	 * @returns 
	 */
	public rotate(offset: number, center?: Pointish){ return this.applyGenerator(Geometry.RotateMutator(offset,center)); }

	/**
	 * Add a generator to the end of the existing generator.
	 * @param gen 
	 */
	public append(gen: GeometryGenerator){ return this.applyGenerator(Geometry.AppendMutator(gen)); }

	/**
	 * Add a generator to the beginning of the existing generator.
	 * @param gen 
	 */
	public prepend(gen: GeometryGenerator){ return this.applyGenerator(Geometry.PrependMutator(gen)); }


	/**
	 * Applies the generator to the current stack 
	 * 
	 * If and when there needs to be cached data this is the point said data should be invalidated.
	 * @param gen 
	 */
	public applyGenerator(gen: GeometryMutationGenerator){
		const geo = this.geometry;
		this.geometry = gen(geo);
		return this;
	}

	/**
	 * Creates an array of points from the geometry class. 
	 * @returns 
	 */
	public toArray(){
		return Array.from(this.geometry());
	}

	/**
	 * Creates a flat list of points.
	 * 
	 * **Warning** this will strip command paths so curves and multi point commands may have unexpected results.
	 */
	public toBuffer(){
		return Array.from(this.geometry()).flatMap(p=>p.toArray());
	}

	public toString(noclose?:boolean){
		return Array.from(this.geometry()).reduce((o,v)=>o+v,'')+(!noclose ? 'z':'');
	}
	/*
	Static methods
	*/

	/**
	 * Commonly used to create freeform shapes this 
	 * @param points 
	 * @returns 
	 */
	static fromBuffer(points: number[], lineTo?:boolean){
		return new Geometry(this.PointsGenerator(points, lineTo));
	}

	/**
	 * Utilizing the CircleGenerator this method initializes a Geometry Instance
	 * @param stops 
	 * @param rotation 
	 * @param radius 
	 * @param center 
	 * @returns 
	 */
	static fromCircle(stops: number, rotation?: number, radius?: number, center?: Point){
		return new Geometry(this.CircleGenerator(stops, rotation, radius, center))
	}

	/*
	Generators

	Because these methods can be used indivually and in conjunction with a Geometry instance the generators are available to use separate from the Geometry instance.
	*/

	/**
	 * Programatically based shapes are likely to be built based on statefull values as such this is a convenience generator that creates an empty geometry.
	 * @returns 
	 */
	static EmptyGenerator(){
		return function*(){};
	}

	/**
	 * Using a flat array of numbers this creates a generator that iterates over all the 
	 * @param buffer 
	 * @returns 
	 */
	static PointsGenerator(buffer: Array<number>, lineTo?: boolean){
		if(buffer.length % 2 !== 0) throw new Error("Invalid buffer provided");
		return function*(){
			for(let i=0; i<buffer.length; i+=2){
				yield new Point(buffer[i], buffer[i+1], lineTo ? "L":i===0 ? "M":"L");
			}
		}
	}

	/**
	 * Finds equidistance points around a circle. This is useful when quickly generating regular polygons.
	 * @param stops 
	 * @param rotation 
	 * @param radius 
	 * @param center 
	 * @returns 
	 */
	static CircleGenerator(stops: number, rotation: number=0, radius:number=50, center:Point = Point.zero("M")){
		const delta = CIRCLE/stops;
		return function*(){
			for(let i = 0; i<stops; i++){
				yield center.clone(!i ? 'M':'L').ray((delta*i)+rotation, radius);
			}
		}
	}

	/*
	Geometry Mutator Generators

	This generators are used to facilitate point manipulation however in some instance one might want to apply additional tranformations on select point by separating these methods this can be used to generate more complex geometries in a simplified manner.
	*/

	/**
	 * Rounds each value down to the provided precision.
	 * @param precision 
	 * @returns 
	 */
	static FloorMutator(precision?:number):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p.floor(precision);
			}
		}
	}

	/**
	 * Rounds each value up to the nearest provided precision.
	 * @param precision 
	 * @returns 
	 */
	static CeilMutator(precision?:number):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p.ceil(precision);
			}
		}
	}

	/**
	 * Rounds each value to the nearest provided precision.
	 * @param precision 
	 * @returns 
	 */
	static RoundMutator(precision?:number):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p.round(precision);
			}
		}
	}

	/**
	 * Applies a translation by adding the delta to the existing point.
	 * @param delta 
	 * @returns 
	 */
	static TranslateMutator(delta: Pointish):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p.add(delta);
			}
		}
	}

	/**
	 * Scales the values in the provided generator. 
	 * @param delta 
	 * @returns 
	 */
	static ScaleMutator(delta: Pointish):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p.multiply(delta);
			}
		}
	}

	static RotateMutator(offset: number, center: Pointish=Point.zero()):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p.rotateAround(center, offset)
			}
		}
	}

	static AppendMutator(newGen: GeometryGenerator): GeometryMutationGenerator{
		return gen => function*(){
			for(const p of gen()){
				yield p;
			}
			for(const p of newGen()){
				yield p;
			}
		}
	}

	static PrependMutator(newGen: GeometryGenerator):GeometryMutationGenerator{
		return gen => function*(){
			for(const p of newGen()){
				yield p;
			}
			for(const p of gen()){
				yield p;
			}
		}
	}
}