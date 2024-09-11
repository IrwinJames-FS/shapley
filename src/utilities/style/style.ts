import { CSSNumeric} from "../../components/types";

/**
 * Converts snakeCased variable names to css camel case
 * @param variables 
 * @returns 
 */
export const vars = (
	variables: Record<string, CSSNumeric | CSSNumeric[] | undefined>, 
	prefixes:string[] = [""])
	: Record<string, string | number> => {
	const o: Record<string, string | number> = {};
	for (const [k, v] of Object.entries(variables)) {
		if(v===undefined) continue;
		const vals = Array.isArray(v) ? v:[v];
		const key = toSnake(k);
		for(let i = 0; i<vals.length;i++){
			if(prefixes.length <= i) break;
			o['--'+prefixes[i]+key] = vals[i];
		}
	}
	return o;
}

/**
 * Throughout the library I am accepting a mixed type for unit values where a unit type can be assumed when a number is provided. This method is a convenience method to standardize the way this instance is handled.
 * @param value 
 * @param unit 
 * @returns 
 */
export const standardizeValue = (value: string | number | undefined, unit:string='px'):string => value !== undefined ?
 typeof value === 'string' 
 ? value:value+unit
 :"none";

/**
 * By using the arguments as class names clsfy creates a space delimited list without leading or trailing spaces.
 * @param names 
 * @returns 
 */
export const clsfy = (...names: (string | undefined)[]): string => names.filter(n=>n).join(' ');

/**
 * Shadows are applied via filters. because of this the shadow is wrapped in a drop-shadow function. In addition this complies with the Hoverable type to allow for a change in shadow when an object is being hovered over.
 * @param str 
 * @returns 
 */
export const shadowfy = (str?: string)=> str ? ({'--shadow':str.split(',').map(v=>`drop-shadow(${v})`).join(' ')}):{};

const toSnake = (str:string)=>str.replace(/[A-Z]/g, l=>'-'+l.toLowerCase());