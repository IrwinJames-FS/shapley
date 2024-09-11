import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as d}from"./index-BrnU7xv7.js";import{ae as s}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function i(r){const n={code:"code",h6:"h6",pre:"pre",...d(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"components/Polygonic/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"}),e.jsx(n.h6,{id:"19",children:"19"}),e.jsx(n.h6,{id:"20",children:"20"}),e.jsx(n.h6,{id:"21",children:"21"}),e.jsx(n.h6,{id:"22",children:"22"}),e.jsx(n.h6,{id:"23",children:"23"}),e.jsx(n.h6,{id:"24",children:"24"}),e.jsx(n.h6,{id:"25",children:"25"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { GeometricProps } from "../Geometric";

export type PolygonicProps = Omit<GeometricProps, "geometry"> & BasePolygonicProps;

export type BasePolygonicProps = {
	/**
	 * The number of sides the polygon should have
	 */
	sides?: number,

	/**
	 * The degrees the polygon should be rotated
	 */
	rotation?: number

	/**
	 * The corner radii used to round the corners of the shape.
	 * 
	 * If a single number is provided the number will be applied to all corners. If an array is provided the corners that are not defined in the array are assumed to be 0.
	 * 
	 * **Warning**: Most shapes are normalized meaning a corner radius of *0.1* is 10% of the view axis.
	 */
	cornerRadius?: number | number[]
}


`})})]})]})}function u(r={}){const{wrapper:n}={...d(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{u as default};
