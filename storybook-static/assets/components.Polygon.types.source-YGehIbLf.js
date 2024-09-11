import{j as o}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as t}from"./index-BrnU7xv7.js";import{ae as s}from"./index-DryY4Ina.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";function n(r){const e={code:"code",h6:"h6",pre:"pre",...t(),...r.components};return o.jsxs(o.Fragment,{children:[o.jsx(s,{title:"components/Polygon/types/source"}),`
`,o.jsxs("div",{className:"numbered-code",children:[o.jsxs("div",{children:[o.jsx(e.h6,{id:"1",children:"1"}),o.jsx(e.h6,{id:"2",children:"2"}),o.jsx(e.h6,{id:"3",children:"3"}),o.jsx(e.h6,{id:"4",children:"4"}),o.jsx(e.h6,{id:"5",children:"5"}),o.jsx(e.h6,{id:"6",children:"6"})]}),o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-ts",children:`import { GeometryProps } from "../Geometry";
import { BasePolygonicProps } from "../Polygonic";
import { PUnit } from "../types";

export type PolygonProps = Omit<GeometryProps, "geometry" | "children"> & PUnit & BasePolygonicProps;

export type PolygonsProps = Omit<PolygonProps, "sides">
`})})]})]})}function y(r={}){const{wrapper:e}={...t(),...r.components};return e?o.jsx(e,{...r,children:o.jsx(n,{...r})}):n(r)}export{y as default};
