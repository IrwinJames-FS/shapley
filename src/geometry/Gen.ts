export type GeneratorList<T> = ()=>Generator<T>;
export type GeneratorMutator<T> = (gen: GeneratorList<T>)=>GeneratorList<T>;

/**
 * Gen uses javascript Generators to allow multiple sources of truth within a method. 
 * 
 * In addition operations can be appended to each iteration declaratively.
 * 
 * @todo - Instead of using a reusable generator use a raw generator and in the each method build a new generator for the next iteration. 
 */
export class Gen<T> {
	generator: GeneratorList<T>
	constructor(generator: GeneratorList<T>){
		this.generator = generator;
	}

	/**
	 * Iterate over each entry in the list
	 */
	*each(){
		yield* this.generator();
	}

	/**
	 * Applies a generator on top of the existing allowing multiple modification operations to be performed in a single iteration.
	 * @param gen 
	 * @returns 
	 */
	apply(gen: GeneratorMutator<T>){
		this.generator = gen(this.generator);
		return this;
	}

	/**
	 * Flattens the Generators existing operations down to the last known value.
	 */
	flatten(){
		const s = Array.from(this.each()); //using each should allow me to update info as flattening occurs if necessary.
		this.generator = function*(){yield* s;}
		return this;
	}
}