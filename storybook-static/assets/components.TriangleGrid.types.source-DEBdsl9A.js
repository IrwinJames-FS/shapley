import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as d}from"./index-BrnU7xv7.js";import{ae as t}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function r(i){const n={code:"code",h6:"h6",pre:"pre",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"components/TriangleGrid/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"}),e.jsx(n.h6,{id:"19",children:"19"}),e.jsx(n.h6,{id:"20",children:"20"}),e.jsx(n.h6,{id:"21",children:"21"}),e.jsx(n.h6,{id:"22",children:"22"}),e.jsx(n.h6,{id:"23",children:"23"}),e.jsx(n.h6,{id:"24",children:"24"}),e.jsx(n.h6,{id:"25",children:"25"}),e.jsx(n.h6,{id:"26",children:"26"}),e.jsx(n.h6,{id:"27",children:"27"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { CSSNumeric } from "../types"

export type TriangleGridProps = {
	/**
	 * The number of columns to provide
	 */
	columns: number

	/**
	 * If you have already generated the triangle paths you want to use their Ids can be provided here
	 */
	geometries?: [string, string]

	/*
	This is only used if the geometries id is not provided
	*/
	cornerRadius?: number

	/**
	 * The gap to be used in the row and column gaps.
	 */
	gap?: CSSNumeric | [CSSNumeric, CSSNumeric]

	/**
	 * Render the horizontal variation of this grid.
	 */
	horizontal?: boolean
}
`})})]})]})}function u(i={}){const{wrapper:n}={...d(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{u as default};
