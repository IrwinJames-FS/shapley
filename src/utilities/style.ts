
/**
 * Converts snakeCased variable names to css camel case
 * @param variables 
 * @returns 
 */
export const vars = (variables: Record<string, string | number>): Record<string, string | number> => {
	const o: Record<string, string | number> = {};
	for (const [k, v] of Object.entries(variables)) {
		o['--'+toSnake(k)] = v;
	}
	return o;
}

const toSnake = (str:string)=>str.replace(/[A-Z]/g, l=>'-'+l.toLowerCase());