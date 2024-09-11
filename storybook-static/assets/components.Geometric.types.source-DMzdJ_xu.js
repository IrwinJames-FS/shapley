import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as t}from"./index-BrnU7xv7.js";import{ae as s}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function r(n){const i={code:"code",h6:"h6",pre:"pre",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"components/Geometric/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(i.h6,{id:"1",children:"1"}),e.jsx(i.h6,{id:"2",children:"2"}),e.jsx(i.h6,{id:"3",children:"3"}),e.jsx(i.h6,{id:"4",children:"4"}),e.jsx(i.h6,{id:"5",children:"5"}),e.jsx(i.h6,{id:"6",children:"6"}),e.jsx(i.h6,{id:"7",children:"7"}),e.jsx(i.h6,{id:"8",children:"8"}),e.jsx(i.h6,{id:"9",children:"9"}),e.jsx(i.h6,{id:"10",children:"10"}),e.jsx(i.h6,{id:"11",children:"11"}),e.jsx(i.h6,{id:"12",children:"12"}),e.jsx(i.h6,{id:"13",children:"13"}),e.jsx(i.h6,{id:"14",children:"14"}),e.jsx(i.h6,{id:"15",children:"15"}),e.jsx(i.h6,{id:"16",children:"16"}),e.jsx(i.h6,{id:"17",children:"17"}),e.jsx(i.h6,{id:"18",children:"18"}),e.jsx(i.h6,{id:"19",children:"19"}),e.jsx(i.h6,{id:"20",children:"20"}),e.jsx(i.h6,{id:"21",children:"21"}),e.jsx(i.h6,{id:"22",children:"22"}),e.jsx(i.h6,{id:"23",children:"23"}),e.jsx(i.h6,{id:"24",children:"24"}),e.jsx(i.h6,{id:"25",children:"25"}),e.jsx(i.h6,{id:"26",children:"26"}),e.jsx(i.h6,{id:"27",children:"27"}),e.jsx(i.h6,{id:"28",children:"28"}),e.jsx(i.h6,{id:"29",children:"29"}),e.jsx(i.h6,{id:"30",children:"30"}),e.jsx(i.h6,{id:"31",children:"31"}),e.jsx(i.h6,{id:"32",children:"32"}),e.jsx(i.h6,{id:"33",children:"33"}),e.jsx(i.h6,{id:"34",children:"34"}),e.jsx(i.h6,{id:"35",children:"35"}),e.jsx(i.h6,{id:"36",children:"36"}),e.jsx(i.h6,{id:"37",children:"37"}),e.jsx(i.h6,{id:"38",children:"38"}),e.jsx(i.h6,{id:"39",children:"39"}),e.jsx(i.h6,{id:"40",children:"40"}),e.jsx(i.h6,{id:"41",children:"41"}),e.jsx(i.h6,{id:"42",children:"42"}),e.jsx(i.h6,{id:"43",children:"43"}),e.jsx(i.h6,{id:"44",children:"44"}),e.jsx(i.h6,{id:"45",children:"45"}),e.jsx(i.h6,{id:"46",children:"46"})]}),e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import { GeometryDefinitionProps } from "../GeometryDefinition";
import { BaseGeomtryRefProps, GeometryRefProps } from "../GeometryRef";
import { Points } from "../../geometry";
import { WithComponents } from "../types";
import { BasePathDefinitionProps, PathDefinitionComponents } from "../PathDefinition";
import { SVGCanvasProps } from "../SVGCanvas";

export type GeometricProps = WithComponents<BaseGeometricProps & SVGCanvasProps, GeometricComponents>;
/**
 * The Base Geometric Props type provides an interface to interact with the SVG backing layer as well as its underlying components. 
 * 
 * Currently this provides properties to either generate shape or reference shapes. 
 * 
 * @todo Should references and generating really be in the same component?
 */
export type BaseGeometricProps = {
	/**
	 * If a pathId is provided this property should also be applied
	 */
	aspectRatio?: string
	
	/**
	 * viewBox is an exising SVG Property however because it is passed as a base property later it seems we need to include it explicitly
	 */
	viewBox?: string //while this is defined in svg it wont be defined later on
	/**
	 * Multiple geometries can be rendered in a Geometric but only the first will be reference to define the viewbox. A custom viewbox can be provided.
	 */
	geometry?: Points | Points[]

	shadow?: string
} & Omit<BasePathDefinitionProps, "id" | "clip"> & BaseGeomtryRefProps;

export type GeometricComponents = {
	/**
	 * If definition &lt;path&gt;s are being defined props can be overriden using this property
	 */
	definition?: Omit<GeometryDefinitionProps, "geometry" | "components">

	/**
	 * Reference &lt;use&gt; default props can be overriden. 
	 */
	reference?: Omit<GeometryRefProps, "src">
	
} & PathDefinitionComponents


`})})]})]})}function f(n={}){const{wrapper:i}={...t(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(r,{...n})}):r(n)}export{f as default};
