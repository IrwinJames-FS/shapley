import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as r}from"./index-BrnU7xv7.js";import{ae as s}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function t(o){const n={code:"code",h6:"h6",pre:"pre",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"components/Geometry/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { BaseGeometricProps, GeometricComponents } from "../Geometric";
import { SVGCanvasProps } from "../SVGCanvas";
import { PUnit, WithComponents } from "../types";

export type GeometryProps = WithComponents<BaseGeometricProps & PUnit, GeometryComponents>;

export type GeometryComponents = {
	/**
	 * Geometry moves the svg prop to the components section so it can be modified as well. 
	 */
	svg?: SVGCanvasProps
} & GeometricComponents;
`})})]})]})}function G(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{G as default};
