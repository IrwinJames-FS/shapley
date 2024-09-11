import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as i}from"./index-BrnU7xv7.js";import{ae as o}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function t(r){const n={code:"code",h6:"h6",pre:"pre",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"geometry/types/source"}),`
`,e.jsxs("div",{className:"numbered-code",children:[e.jsxs("div",{children:[e.jsx(n.h6,{id:"1",children:"1"}),e.jsx(n.h6,{id:"2",children:"2"}),e.jsx(n.h6,{id:"3",children:"3"}),e.jsx(n.h6,{id:"4",children:"4"}),e.jsx(n.h6,{id:"5",children:"5"}),e.jsx(n.h6,{id:"6",children:"6"}),e.jsx(n.h6,{id:"7",children:"7"}),e.jsx(n.h6,{id:"8",children:"8"}),e.jsx(n.h6,{id:"9",children:"9"}),e.jsx(n.h6,{id:"10",children:"10"}),e.jsx(n.h6,{id:"11",children:"11"}),e.jsx(n.h6,{id:"12",children:"12"}),e.jsx(n.h6,{id:"13",children:"13"}),e.jsx(n.h6,{id:"14",children:"14"}),e.jsx(n.h6,{id:"15",children:"15"}),e.jsx(n.h6,{id:"16",children:"16"}),e.jsx(n.h6,{id:"17",children:"17"}),e.jsx(n.h6,{id:"18",children:"18"}),e.jsx(n.h6,{id:"19",children:"19"}),e.jsx(n.h6,{id:"20",children:"20"}),e.jsx(n.h6,{id:"21",children:"21"}),e.jsx(n.h6,{id:"22",children:"22"}),e.jsx(n.h6,{id:"23",children:"23"})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import Point from "./Point";
import RoundedCorner from "./RoundedCorner";

/**
 * The vector type is used to declare the 2 dimensional point along with an angle to use as a trajectory.
 */
export type Vector = [number, number, number];

/**
 * This is a min max rect where the first two numbers are the min coordinate and the last two numbers are the max coordinates in the rect.
 */
export type Rect = [Point, Point, Point];

/**
 * The vertex generator is a method that returns a Generator method or an IteratableIterator.
 * 
 * The generator it returns should always return a Point or RoundedCorner method. 
 */
export type VertexGenerator = ()=>Generator<Point | RoundedCorner>

/**
 * Really I just need the numeric values provided by the additional points all the math will be relative to the point the function is being called from. therefore I can simplify the process by not requiring a point be provided. this will reduce necessary new calls and Point instances. 
 */
export type SupportedPointMathTypes = Point | [number, number];
`})})]})]})}function u(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{u as default};
