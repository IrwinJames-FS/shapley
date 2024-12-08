export type GeneratorList<T> = ()=>Generator<T>;
export type GeneratorMutator<T> = (gen: GeneratorList<T>)=>GeneratorList<T>;

/**
 * Gen uses javascript Generators to allow multiple sources of truth within a method. 
 * 
 * In addition operations can be appended to each iteration declaratively.
 */
class Gen<T> {
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
	 * 
	 * @param gen 
	 * @returns 
	 */
	apply(gen: GeneratorMutator<T>){
		this.generator = gen(this.generator);
		return this;
	}
}

export default Gen