import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as s}from"./index-BrnU7xv7.js";import{ae as r}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function i(t){const n={code:"code",h6:"h6",pre:"pre",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"components/SVGCanvas/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * The SVG canvas is simply a custom SVG element designed to simplify visually representing information.
 * 
 * Because canvas' can display and cache information it accepts defs as a property which is just an alias to the &lt;defs&gt;
 */
export type SVGCanvasProps = ComponentPropsWithoutRef<"svg"> & {

	/**
	 * Simply an alias to an internal &lt;defs&gt; 
	 */
	defs?: ReactNode
};
`})})]})]})}function u(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{u as default};
