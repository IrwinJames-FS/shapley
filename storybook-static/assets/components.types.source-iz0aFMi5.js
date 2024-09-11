import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as d}from"./index-BrnU7xv7.js";import{ae as h}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function r(i){const n={code:"code",h6:"h6",pre:"pre",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(h,{title:"components/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"}),e.jsx(n.h6,{id:"19",children:"19"}),e.jsx(n.h6,{id:"20",children:"20"}),e.jsx(n.h6,{id:"21",children:"21"}),e.jsx(n.h6,{id:"22",children:"22"}),e.jsx(n.h6,{id:"23",children:"23"}),e.jsx(n.h6,{id:"24",children:"24"}),e.jsx(n.h6,{id:"25",children:"25"}),e.jsx(n.h6,{id:"26",children:"26"}),e.jsx(n.h6,{id:"27",children:"27"}),e.jsx(n.h6,{id:"28",children:"28"}),e.jsx(n.h6,{id:"29",children:"29"}),e.jsx(n.h6,{id:"30",children:"30"}),e.jsx(n.h6,{id:"31",children:"31"}),e.jsx(n.h6,{id:"32",children:"32"}),e.jsx(n.h6,{id:"33",children:"33"}),e.jsx(n.h6,{id:"34",children:"34"}),e.jsx(n.h6,{id:"35",children:"35"}),e.jsx(n.h6,{id:"36",children:"36"}),e.jsx(n.h6,{id:"37",children:"37"}),e.jsx(n.h6,{id:"38",children:"38"}),e.jsx(n.h6,{id:"39",children:"39"}),e.jsx(n.h6,{id:"40",children:"40"}),e.jsx(n.h6,{id:"41",children:"41"}),e.jsx(n.h6,{id:"42",children:"42"}),e.jsx(n.h6,{id:"43",children:"43"}),e.jsx(n.h6,{id:"44",children:"44"}),e.jsx(n.h6,{id:"45",children:"45"}),e.jsx(n.h6,{id:"46",children:"46"}),e.jsx(n.h6,{id:"47",children:"47"}),e.jsx(n.h6,{id:"48",children:"48"}),e.jsx(n.h6,{id:"49",children:"49"}),e.jsx(n.h6,{id:"50",children:"50"}),e.jsx(n.h6,{id:"51",children:"51"}),e.jsx(n.h6,{id:"52",children:"52"}),e.jsx(n.h6,{id:"53",children:"53"}),e.jsx(n.h6,{id:"54",children:"54"}),e.jsx(n.h6,{id:"55",children:"55"}),e.jsx(n.h6,{id:"56",children:"56"}),e.jsx(n.h6,{id:"57",children:"57"}),e.jsx(n.h6,{id:"58",children:"58"}),e.jsx(n.h6,{id:"59",children:"59"}),e.jsx(n.h6,{id:"60",children:"60"}),e.jsx(n.h6,{id:"61",children:"61"}),e.jsx(n.h6,{id:"62",children:"62"}),e.jsx(n.h6,{id:"63",children:"63"}),e.jsx(n.h6,{id:"64",children:"64"}),e.jsx(n.h6,{id:"65",children:"65"}),e.jsx(n.h6,{id:"66",children:"66"}),e.jsx(n.h6,{id:"67",children:"67"}),e.jsx(n.h6,{id:"68",children:"68"}),e.jsx(n.h6,{id:"69",children:"69"}),e.jsx(n.h6,{id:"70",children:"70"}),e.jsx(n.h6,{id:"71",children:"71"}),e.jsx(n.h6,{id:"72",children:"72"}),e.jsx(n.h6,{id:"73",children:"73"}),e.jsx(n.h6,{id:"74",children:"74"}),e.jsx(n.h6,{id:"75",children:"75"}),e.jsx(n.h6,{id:"76",children:"76"}),e.jsx(n.h6,{id:"77",children:"77"}),e.jsx(n.h6,{id:"78",children:"78"}),e.jsx(n.h6,{id:"79",children:"79"}),e.jsx(n.h6,{id:"80",children:"80"}),e.jsx(n.h6,{id:"81",children:"81"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { ReactNode, ComponentPropsWithoutRef, ElementType, CSSProperties } from "react"

/**
 * Most components I expect this to be used with will be capable of being a parent unit... infact all components currently require that the children can be set. I may explore alternative that dont have this requirement later.
 * 
 */
export type PUnit = {
	children?:ReactNode
}

/**
 * All of the specialized Polgyon Grids accept these base properties.
 */
export type BaseShapelyGridProps = {
	children?: ReactNode
	rowSize?: number
	spacing?: CSSNumeric
	offset?: number
}

/**
 * CSSNumeric is the base types that CSS supports
 */
export type CSSNumeric = 
/**
 * Numbers are automatically converted to a px value
 */
number 


/**
 * Strings are treated with as raw css
 */
| string

type PathComponent = ComponentPropsWithoutRef<"use">
export type PStyle = Pick<PathComponent, "fill" | "stroke" | "strokeWidth"> & {shadow?: string};



export type PStyled = {
	pstyle?: PStyle
}


/**
 * For now I want to support hover effects I will have to find a more extensible method as I add in more responsive controls.
 */
export type Hoverable<T> = T | [T, T];

export type PolyMorphProps<T extends ElementType> = {
	as?: T
} & ComponentPropsWithoutRef<T>

/**
 * PolyMorphic is a type decorator to describe the properties of an overridable react component.
 * 
 * Providing a valid ElementType to the as property will allow a developer to override the root element of a component while still respecting linting rules in typescript.
 * 
 * as such the properties will be a combination of the root element type and the properties provided to P.
 */
export type PolyMorphic<P, T extends ElementType> = PolyMorphProps<T> & P;

export type CSSPropertiesPlusVars = CSSProperties & {
	[k: string]: CSSNumeric
}

export type Docked<T> = (props:T)=>ReactNode

/**
 * Shapely Components Utilize this component to inherit parts of Inherited properties in a logical manner
 */
export type WithComponents<T extends object, C extends object> = T & ComponentsRecord<C>;


export type ComponentsRecord<T extends object> = {
	/**
	 * Components will be a record of prop overrides available.
	 */
	components?:T
}

`})})]})]})}function y(i={}){const{wrapper:n}={...d(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{y as default};
