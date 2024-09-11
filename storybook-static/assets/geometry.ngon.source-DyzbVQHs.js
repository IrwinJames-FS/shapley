import{j as n}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as t}from"./index-BrnU7xv7.js";import{ae as s}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function i(e){const r={code:"code",h6:"h6",pre:"pre",...t(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"geometry/ngon/source"}),`
`,n.jsxs("div",{className:"numbered-code",children:[n.jsxs("div",{children:[n.jsx(r.h6,{id:"1",children:"1"}),n.jsx(r.h6,{id:"2",children:"2"}),n.jsx(r.h6,{id:"3",children:"3"}),n.jsx(r.h6,{id:"4",children:"4"}),n.jsx(r.h6,{id:"5",children:"5"}),n.jsx(r.h6,{id:"6",children:"6"}),n.jsx(r.h6,{id:"7",children:"7"}),n.jsx(r.h6,{id:"8",children:"8"}),n.jsx(r.h6,{id:"9",children:"9"}),n.jsx(r.h6,{id:"10",children:"10"}),n.jsx(r.h6,{id:"11",children:"11"}),n.jsx(r.h6,{id:"12",children:"12"}),n.jsx(r.h6,{id:"13",children:"13"}),n.jsx(r.h6,{id:"14",children:"14"}),n.jsx(r.h6,{id:"15",children:"15"}),n.jsx(r.h6,{id:"16",children:"16"}),n.jsx(r.h6,{id:"17",children:"17"}),n.jsx(r.h6,{id:"18",children:"18"}),n.jsx(r.h6,{id:"19",children:"19"}),n.jsx(r.h6,{id:"20",children:"20"}),n.jsx(r.h6,{id:"21",children:"21"}),n.jsx(r.h6,{id:"22",children:"22"}),n.jsx(r.h6,{id:"23",children:"23"}),n.jsx(r.h6,{id:"24",children:"24"})]}),n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-ts",children:`import { round } from "./arithmetic";
import Point from "./Point";
import RoundedCorner from "./RoundedCorner";

type DArg = string | number | number[] | Point | RoundedCorner | undefined;

/**
 * This template array method simplifies the path creation process by adding additional support for numbers and arrays of numbers. 
 * 
 * This method accepts strings, numbers, number arrays, Point and RoundedCorner types. Arrays will only use the first two values. Point and RoundedCorner have special toString methods which are utilized to add support here. 
 * 
 * @todo Update the DArg value to accept a generic type that has a toString method instead of a Point or RoundedCorner method this will allow other drawing classes to be implemented in later iterations.
 * @param strings 
 * @param args 
 * @returns 
 */
export const $d = (strings: TemplateStringsArray, ...args: DArg[]): string => strings.reduce((o,v,i)=>{
	if(i>=args.length || args[i] === undefined) return o+v;
	if((args[i] instanceof Point) || (args[i] instanceof RoundedCorner)) return o+v+args[i]
	//all arrays will only use the first two points until I encounter a use case for anything else.
	if(Array.isArray(args[i])) return o+v+args[i].slice(0,2).map(v=>round(v, 5)).join(', ');
	return o+v+(typeof args[i] === 'string' ? args[i]:round(args[i], 5));
}, '');


`})})]})]})}function g(e={}){const{wrapper:r}={...t(),...e.components};return r?n.jsx(r,{...e,children:n.jsx(i,{...e})}):i(e)}export{g as default};
