import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as o}from"./index-BrnU7xv7.js";import{ae as s}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function t(i){const n={code:"code",h6:"h6",pre:"pre",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"components/GeometryDefinition/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { Points } from "../../geometry"
import { PathDefinitionProps } from "../PathDefinition"
/**
 * This type accepts a geometry property that expects an instance of a Points class. In addition to this it accepts all the base properties of a PathDefinition.
 */
export type GeometryDefinitionProps = BaseGeometryDefinitionProps & Omit<PathDefinitionProps, "d">;

/**
 * A Geometry Definition is an extension of a path definition that uses the command M, L, and Q to generate shapes from a collection of points.
 */
export type BaseGeometryDefinitionProps = {
	/**
	 * The **Points** class that is used to generate the path commands. 
	 */
	geometry: Points
}



`})})]})]})}function f(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{f as default};
