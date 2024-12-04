

/**
 * PSIMD knows how to interact with the following types. 
 */
export type PSIMDable = number | number[] | psimd;
/**
 * psimd or psuedo single instruction multiple destination model is just used to scale and manage 2d values in a simpler manner. because not all svg commands are technically a scalable value or 2d such as radius values this will simply apply the desired operation to all entries it will be up to the Path commands to know what values to use. 
 * 
 * 
 * By default all method modify the calling instance. if you wish to create a new instance you can use the clone method.
 * @todo Utilize a real simd library if a cross environment option becomes available.
 */
class psimd extends Array<number> {
	/**
	 * psimd is extended from an array so all native array methods should be available.
	 * @param values 
	 */
	constructor(...values: number[]){
		super(values.length)
		for(let i = 0; i<values.length;i++)this[i] = values[i];
	}
	
	/**
	 * Clones all the values contained in this instance to a new instance of psimd.
	 * @returns 
	 */
	public clone(){ return new psimd(...this); }

	/**
	 * Adds values to the source.
	 * 
	 * if a single value is provided it will be added to all values in the source.
	 * 
	 * If an array is provided it will be added to the source based on its index. if the source is longer then the input the input will be repeated. 
	 * @param value 
	 */
	public add(value: PSIMDable){ return this.performOp(value, (a,b)=>a+b); }

	/**
	 * Subtract values from the source.
	 * if a single value is provided it will be subtracted from all values in the source.
	 * 
	 * If an array is provided it will be subtracted from the source based on its index. if the source is longer then the input the input will be repeated. 
	 * @param value 
	 * @returns 
	 */
	public subtract(value: PSIMDable){ return this.performOp(value, (a,b)=>a-b); }

	/**
	 * Multiplies the source by the values.
	 * if a single value is provided it will be multiplied by all values in the source.
	 * 
	 * If an array is provided it will be multiplied by the source based on its index. if the source is longer then the input the input will be repeated. 
	 * @param value 
	 * @returns 
	 */
	public multiply(value: PSIMDable){ return this.performOp(value, (a,b)=>a*b); }

	/**
	 * Divides the source by the values.
	 * if a single value is provided all values in the source will be divided by the provided value.
	 * 
	 * If an array is provided the values in the source will be divided by the value found at index%input.length
	 * @param value 
	 * @returns 
	 */
	public divide(value: PSIMDable){ return this.performOp(value, (a,b)=>a/b); }

	/**
	 * Perform an operation and standardize the handling of PSIMDable types.
	 * @param value 
	 * @param op 
	 * @returns 
	 */
	public performOp(value: PSIMDable, op: (value: number, sup: number)=>number){
		value = typeof value === 'number' ? [value]:value;
		for(let i = 0; i<this.length; i++){
			this[i] = op(this[i], value[i%value.length]); //assign using a cyclical fashion.
		}
		return this;
	}

	/**
	 * Designed to replicate the functionality of stride from swift or range form python
	 * 
	 * @param step 
	 * @param start 
	 * @param end 
	 * @throws {Error} - if the start and end selects a range larger then the source. or if the range length is not divisible by the step size. 
	 */
	public *stride(step: number, start?:number, end?: number): Generator<number[]> {
		
		yield* psimd.stride([...this], step, start, end);
	}

	/**
	 * Generate a fixed length of 0's
	 * @param ln 
	 * @returns 
	 */
	static zero(ln: number = 2){ return this.repeating(0, ln)}

	/**
	 * Make a list of repeating values.
	 * @param value 
	 * @param ln 
	 * @returns 
	 */
	static repeating(value: number, ln: number = 2) { return new psimd(...new Array(ln).fill(value)); }

	static *stride<T>(array: T[], step: number, start: number=0, end:number=array.length): Generator<T[]>{
		if(start < 0 || start > array.length-1 || end < 0 || end > array.length) throw new Error("Index out of bounds");
		const ln = end-start;
		
		if(ln%step) throw new Error(`Step mismatch, ${step} does not stride ${ln} nicely`);
		for(let i = 0; i<ln; i+=step){
			yield array.slice(i, i+step);
		}
	}
}

export default psimd;