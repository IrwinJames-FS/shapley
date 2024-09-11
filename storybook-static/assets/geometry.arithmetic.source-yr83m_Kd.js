import{j as n}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as d}from"./index-BrnU7xv7.js";import{ae as t}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function i(r){const e={code:"code",h6:"h6",pre:"pre",...d(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"geometry/arithmetic/source"}),`
`,n.jsxs("div",{className:"numbered-code",children:[n.jsxs("div",{children:[n.jsx(e.h6,{id:"1",children:"1"}),n.jsx(e.h6,{id:"2",children:"2"}),n.jsx(e.h6,{id:"3",children:"3"}),n.jsx(e.h6,{id:"4",children:"4"}),n.jsx(e.h6,{id:"5",children:"5"}),n.jsx(e.h6,{id:"6",children:"6"}),n.jsx(e.h6,{id:"7",children:"7"}),n.jsx(e.h6,{id:"8",children:"8"}),n.jsx(e.h6,{id:"9",children:"9"}),n.jsx(e.h6,{id:"10",children:"10"}),n.jsx(e.h6,{id:"11",children:"11"}),n.jsx(e.h6,{id:"12",children:"12"}),n.jsx(e.h6,{id:"13",children:"13"}),n.jsx(e.h6,{id:"14",children:"14"}),n.jsx(e.h6,{id:"15",children:"15"}),n.jsx(e.h6,{id:"16",children:"16"}),n.jsx(e.h6,{id:"17",children:"17"}),n.jsx(e.h6,{id:"18",children:"18"}),n.jsx(e.h6,{id:"19",children:"19"})]}),n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export const round = (num: number, limit: number) => {
	if(!limit) return Math.round(num);
	const l = 10**limit;
	return Math.round(Math.round(num*l))/l;
}

/**
 * Convert radians to degress
 * @param {number} rad 
 * @returns 
 */
export const toDeg = (rad: number):number => rad * 180/Math.PI;

/**
 * Convert degrees to radians
 * @param deg 
 * @returns 
 */
export const toRad = (deg: number):number => deg * Math.PI/180;

`})})]})]})}function p(r={}){const{wrapper:e}={...d(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(i,{...r})}):i(r)}export{p as default};
