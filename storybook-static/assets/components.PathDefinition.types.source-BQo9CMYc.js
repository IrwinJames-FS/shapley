import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as o}from"./index-BrnU7xv7.js";import{ae as h}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function t(i){const n={code:"code",h6:"h6",pre:"pre",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(h,{title:"components/PathDefinition/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"}),e.jsx(n.h6,{id:"19",children:"19"}),e.jsx(n.h6,{id:"20",children:"20"}),e.jsx(n.h6,{id:"21",children:"21"}),e.jsx(n.h6,{id:"22",children:"22"}),e.jsx(n.h6,{id:"23",children:"23"}),e.jsx(n.h6,{id:"24",children:"24"}),e.jsx(n.h6,{id:"25",children:"25"}),e.jsx(n.h6,{id:"26",children:"26"}),e.jsx(n.h6,{id:"27",children:"27"}),e.jsx(n.h6,{id:"28",children:"28"}),e.jsx(n.h6,{id:"29",children:"29"}),e.jsx(n.h6,{id:"30",children:"30"}),e.jsx(n.h6,{id:"31",children:"31"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { ComponentPropsWithoutRef } from "react";
import { WithComponents } from "../types";


/**
 * The component based props. This is separated in the event the component property needs to be modified.
 */
export type PathDefinitionProps = WithComponents<BasePathDefinitionProps & ComponentPropsWithoutRef<"path">, PathDefinitionComponents>;

/**
 * A path definition is the lowest level component used to render a &lt;path&gt; component.
 * 
 * this component renders a path and clipPath component.
 */
export type BasePathDefinitionProps = {
	/**
	 * A path definition must be provided a unique id. This is used to reference the path.
	 */
	id: string

	/**
	 * If object bounding is pass through the all geometries will be normalized. This is benefitial if using the same path to clip an html element.
	 */
	objectBounding?: boolean
};

/**
 * The &lt;clipPath&gt; components props can be overriden as well by passing the properties to the **components.clipPath** property
 */
export type PathDefinitionComponents = {
	clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "id">
}
`})})]})]})}function f(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{f as default};
