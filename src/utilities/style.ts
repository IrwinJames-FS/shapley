
/**
 * Converts snakeCased variable names to css camel case
 * @param variables 
 * @returns 
 */
export const vars = (variables: Record<string, string | number | undefined>): Record<string, string | number> => {
	const o: Record<string, string | number> = {};
	for (const [k, v] of Object.entries(variables)) {
		if(v===undefined) continue;
		o['--'+toSnake(k)] = v;
	}
	return o;
}

/**
 * Throughout the library I am accepting a mixed type for unit values where a unit type can be assumed when a number is provided. This method is a convenience method to standardize the way this instance is handled.
 * @param value 
 * @param unit 
 * @returns 
 */
export const standardizeValue = (value: string | number | undefined, unit:string='px'):string => value ? typeof value === 'string' ? value:value+unit:"none";


export const clsfy = (...names: (string | undefined)[]): string => names.filter(n=>n).join(' ');
const toSnake = (str:string)=>str.replace(/[A-Z]/g, l=>'-'+l.toLowerCase());