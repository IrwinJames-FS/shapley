import{j as r}from"./jsx-runtime-CkxqCPlQ.js";import{S as c}from"./ShapelyGrid-CjDbm5JN.js";import{S as p}from"./SVGCache-CuVmUNdE.js";import{P as f}from"./PolygonDefinition-DivdZsVH.js";import{v as y}from"./Geometric-sZ--qBRS.js";const o=({as:i,geometry:n,cornerRadius:u,...l})=>{let a=n??"",t;if(!n){const e=y();a="#"+e,t=r.jsx(p,{children:r.jsx(f,{id:e,sides:4,cornerRadius:u,objectBounding:!0})})}return r.jsxs(r.Fragment,{children:[t,r.jsx(c,{as:i||"div",cellSize:[2,2],columnCell:"1fr",columnSuffix:"1fr",aspectRatio:"1 / 1",layout:(e,d)=>{const s=e%d,m=Math.floor(e/d);return[s,m*2+(1+s)%2,a]},...l})]})},x=o;try{o.displayName="DiamondGrid",o.__docgenInfo={description:"",displayName:"DiamondGrid",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType | undefined"}},columns:{defaultValue:null,description:"The number of columns in each row..",name:"columns",required:!0,type:{name:"number"}},geometry:{defaultValue:null,description:"If you already have a Diamond Geometry you can provide its id here if not one will be generated for you. It is recommended that the geometry be objectBounding and normalized to work properly.",name:"geometry",required:!1,type:{name:"string | undefined"}},gap:{defaultValue:null,description:"The desired gap",name:"gap",required:!1,type:{name:"CSSNumeric | [CSSNumeric, CSSNumeric] | undefined"}},cornerRadius:{defaultValue:null,description:"If you provide a geometry property this will be ignored however this provides the opportunity to add a corner radius to the grid. Typically geometries are described as values between 0-1 as such your corner radius should be < the shortest sides intersecting at the vertex.",name:"cornerRadius",required:!1,type:{name:"number | number[] | undefined"}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"string | undefined"}}}}}catch{}export{x as D};
