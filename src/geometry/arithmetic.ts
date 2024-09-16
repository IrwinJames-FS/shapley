/**
 * Because the names of these methods are so common I will be namespacing them to Arithmetic by default. 
 */
const Arithmetic = {
	/**
	 * Rounds the value down by the desired precision.
	 * @param value 
	 * @param precision 
	 * @returns 
	 */
	floor: (value: number, precision: number=0) => {
		if(!precision) return Math.floor(value);
		const pow = 10**precision;
		const v = value * pow; //change the decimal location
		return Math.floor(v)/pow; //move the decimal back.
	},

	/**
	 * Rounds the value up by the desired precision.
	 * @param value 
	 * @param precision 
	 * @returns 
	 */
	ceil: (value: number, precision: number=0) => {
		if(!precision) return Math.ceil(value);
		const pow = 10**precision;
		const v = value * pow; //change the decimal location
		return Math.ceil(v)/pow; //move the decimal back.
	},

	/**
	 * Rounds the value to the nearest value by the desired precision. 
	 * @param value 
	 * @param precision 
	 * @returns 
	 */
	round: (value: number, precision: number=0) => {
		if(!precision) return Math.round(value);
		const pow = 10**precision;
		const v = value * pow; //change the decimal location
		return Math.round(v)/pow; //move the decimal back.
	},

	toDegree: (value:number)=>(value*180)/Math.PI,
	toRadian: (value:number)=>(value*Math.PI)/180

}

export default Arithmetic;