import{j as n}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as r}from"./index-BrnU7xv7.js";import{ae as d}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function s(i){const e={code:"code",h6:"h6",pre:"pre",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(d,{title:"utilities/style/style/source"}),`
`,n.jsxs("div",{className:"numbered-code",children:[n.jsxs("div",{children:[n.jsx(e.h6,{id:"1",children:"1"}),n.jsx(e.h6,{id:"2",children:"2"}),n.jsx(e.h6,{id:"3",children:"3"}),n.jsx(e.h6,{id:"4",children:"4"}),n.jsx(e.h6,{id:"5",children:"5"}),n.jsx(e.h6,{id:"6",children:"6"}),n.jsx(e.h6,{id:"7",children:"7"}),n.jsx(e.h6,{id:"8",children:"8"}),n.jsx(e.h6,{id:"9",children:"9"}),n.jsx(e.h6,{id:"10",children:"10"}),n.jsx(e.h6,{id:"11",children:"11"}),n.jsx(e.h6,{id:"12",children:"12"}),n.jsx(e.h6,{id:"13",children:"13"}),n.jsx(e.h6,{id:"14",children:"14"}),n.jsx(e.h6,{id:"15",children:"15"}),n.jsx(e.h6,{id:"16",children:"16"}),n.jsx(e.h6,{id:"17",children:"17"}),n.jsx(e.h6,{id:"18",children:"18"}),n.jsx(e.h6,{id:"19",children:"19"}),n.jsx(e.h6,{id:"20",children:"20"}),n.jsx(e.h6,{id:"21",children:"21"}),n.jsx(e.h6,{id:"22",children:"22"}),n.jsx(e.h6,{id:"23",children:"23"}),n.jsx(e.h6,{id:"24",children:"24"}),n.jsx(e.h6,{id:"25",children:"25"}),n.jsx(e.h6,{id:"26",children:"26"}),n.jsx(e.h6,{id:"27",children:"27"}),n.jsx(e.h6,{id:"28",children:"28"}),n.jsx(e.h6,{id:"29",children:"29"}),n.jsx(e.h6,{id:"30",children:"30"}),n.jsx(e.h6,{id:"31",children:"31"}),n.jsx(e.h6,{id:"32",children:"32"}),n.jsx(e.h6,{id:"33",children:"33"}),n.jsx(e.h6,{id:"34",children:"34"}),n.jsx(e.h6,{id:"35",children:"35"}),n.jsx(e.h6,{id:"36",children:"36"}),n.jsx(e.h6,{id:"37",children:"37"}),n.jsx(e.h6,{id:"38",children:"38"}),n.jsx(e.h6,{id:"39",children:"39"}),n.jsx(e.h6,{id:"40",children:"40"}),n.jsx(e.h6,{id:"41",children:"41"}),n.jsx(e.h6,{id:"42",children:"42"}),n.jsx(e.h6,{id:"43",children:"43"}),n.jsx(e.h6,{id:"44",children:"44"}),n.jsx(e.h6,{id:"45",children:"45"}),n.jsx(e.h6,{id:"46",children:"46"}),n.jsx(e.h6,{id:"47",children:"47"}),n.jsx(e.h6,{id:"48",children:"48"}),n.jsx(e.h6,{id:"49",children:"49"})]}),n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { CSSNumeric} from "../../components/types";

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
export const shadowfy = (str?: string)=> str ? ({'--shadow':str.split(',').map(v=>\`drop-shadow(\${v})\`).join(' ')}):{};

const toSnake = (str:string)=>str.replace(/[A-Z]/g, l=>'-'+l.toLowerCase());
`})})]})]})}function p(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{p as default};
