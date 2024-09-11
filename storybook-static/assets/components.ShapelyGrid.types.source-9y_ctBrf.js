import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as d}from"./index-BrnU7xv7.js";import{ae as t}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function h(i){const n={code:"code",h6:"h6",pre:"pre",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"components/ShapelyGrid/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"}),e.jsx(n.h6,{id:"19",children:"19"}),e.jsx(n.h6,{id:"20",children:"20"}),e.jsx(n.h6,{id:"21",children:"21"}),e.jsx(n.h6,{id:"22",children:"22"}),e.jsx(n.h6,{id:"23",children:"23"}),e.jsx(n.h6,{id:"24",children:"24"}),e.jsx(n.h6,{id:"25",children:"25"}),e.jsx(n.h6,{id:"26",children:"26"}),e.jsx(n.h6,{id:"27",children:"27"}),e.jsx(n.h6,{id:"28",children:"28"}),e.jsx(n.h6,{id:"29",children:"29"}),e.jsx(n.h6,{id:"30",children:"30"}),e.jsx(n.h6,{id:"31",children:"31"}),e.jsx(n.h6,{id:"32",children:"32"}),e.jsx(n.h6,{id:"33",children:"33"}),e.jsx(n.h6,{id:"34",children:"34"}),e.jsx(n.h6,{id:"35",children:"35"}),e.jsx(n.h6,{id:"36",children:"36"}),e.jsx(n.h6,{id:"37",children:"37"}),e.jsx(n.h6,{id:"38",children:"38"}),e.jsx(n.h6,{id:"39",children:"39"}),e.jsx(n.h6,{id:"40",children:"40"}),e.jsx(n.h6,{id:"41",children:"41"}),e.jsx(n.h6,{id:"42",children:"42"}),e.jsx(n.h6,{id:"43",children:"43"}),e.jsx(n.h6,{id:"44",children:"44"}),e.jsx(n.h6,{id:"45",children:"45"}),e.jsx(n.h6,{id:"46",children:"46"}),e.jsx(n.h6,{id:"47",children:"47"}),e.jsx(n.h6,{id:"48",children:"48"}),e.jsx(n.h6,{id:"49",children:"49"}),e.jsx(n.h6,{id:"50",children:"50"}),e.jsx(n.h6,{id:"51",children:"51"}),e.jsx(n.h6,{id:"52",children:"52"}),e.jsx(n.h6,{id:"53",children:"53"}),e.jsx(n.h6,{id:"54",children:"54"}),e.jsx(n.h6,{id:"55",children:"55"}),e.jsx(n.h6,{id:"56",children:"56"}),e.jsx(n.h6,{id:"57",children:"57"}),e.jsx(n.h6,{id:"58",children:"58"}),e.jsx(n.h6,{id:"59",children:"59"}),e.jsx(n.h6,{id:"60",children:"60"}),e.jsx(n.h6,{id:"61",children:"61"}),e.jsx(n.h6,{id:"62",children:"62"}),e.jsx(n.h6,{id:"63",children:"63"}),e.jsx(n.h6,{id:"64",children:"64"}),e.jsx(n.h6,{id:"65",children:"65"}),e.jsx(n.h6,{id:"66",children:"66"}),e.jsx(n.h6,{id:"67",children:"67"}),e.jsx(n.h6,{id:"68",children:"68"}),e.jsx(n.h6,{id:"69",children:"69"}),e.jsx(n.h6,{id:"70",children:"70"}),e.jsx(n.h6,{id:"71",children:"71"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { CSSNumeric, PStyle } from "../types"

/**
 * The Shapely Grid props are used to layout the items so they can be displayed appropriately
 */
export type ShapelyGridProps = {
	/**
	 * Aspect ratio is assumed to be 1/1 unless provided different. This is benefitial in preventing malshaped grid cells.
	 */
	aspectRatio?: string,

	/**
	 * The number of columns per row. 
	 */
	columns: number,

	/**
	 * This is the number of fractional units that dimension should span in gridRowEnd and gridColumnEnd.
	 */
	cellSize?: [number, number]

	/**
	 * This value is the representation of the cell width in fractional units this will be used within a repeat function to generate the columnTemplate
	 */
	columnCell?: string

	/**
	 * This property can be used to add a prefix before the repeat function
	 */
	columnPrefix?:string

	/**
	 * This property can be used to add a suffix after the repeat function
	 */
	columnSuffix?:string

	/**
	 * Because many of the cells bounding rectangles will overlap in a custom layout this can be used to clip the cells so they do not interfere with each others hover and click methods. 
	 */
	clipPath?: string

	/**
	 * The space between each cell
	 * This can be descibed as a single cell or as [column, row] spacing. This will help with having matching spacing when laying out shapes with an irregular aspect ratio
	 */
	gap?: CSSNumeric | [CSSNumeric, CSSNumeric]

	/**
	 * The layout function is used create a custom layout. if every cell is reliant on a single pathID the last argument in ShapelyGridLayoutFN tuple can be comitted.
	 */
	layout?: ShapelyGridLayoutFn

	/**
	 * This property provides an id to a cached shape 
	 */
	pathID?: string

	/**
	 * A pattern to be used in the row auto property
	 */
	row?: string
} & PStyle

/**
 * The Layout function is a method that provides the current index and column size.
 * 
 * the return method should return the [column, row, id?]
 * 
 * The id can be optional if only one geometry is used.
 */
export type ShapelyGridLayoutFn = (index: number, count: number) => [number, number] | [number, number, string]
	
`})})]})]})}function m(i={}){const{wrapper:n}={...d(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}export{m as default};
