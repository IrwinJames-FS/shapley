import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{S as H}from"./ShapelyGrid-CjDbm5JN.js";import{S as w}from"./SVGCache-CuVmUNdE.js";import{P as C}from"./PolygonDefinition-DivdZsVH.js";import{v as G}from"./Geometric-sZ--qBRS.js";import"./index-DJO9vBfz.js";import"./Points-D1gxx6HH.js";const l=({as:r,geometry:o,cornerRadius:b,horizontal:a,...S})=>{let s=o??"",c;if(!o){const n=G();s="#"+n,c=e.jsx(w,{children:e.jsx(C,{id:n,sides:6,rotation:a?30:0,cornerRadius:b,objectBounding:!0})})}return e.jsxs(e.Fragment,{children:[c,e.jsx(H,{as:r||"div",cellSize:a?[3,2]:[2,3],columnCell:a?"1fr 2fr":"1fr",columnSuffix:"1fr",aspectRatio:a?"3518437208883200 / 3047056004513267":"3047056004513267 / 3518437208883200",row:a?"1fr":"1fr 2fr",layout:(n,u)=>{const d=n%u,m=Math.floor(n/u);return a?[d*2,m*2+(1+d)%2,s]:[d,m*4+(1+d)%2*2,s]},...S})]})},_=l;try{l.displayName="HexagonGrid",l.__docgenInfo={description:"",displayName:"HexagonGrid",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType | undefined"}},columns:{defaultValue:null,description:"The number of cells in each row",name:"columns",required:!0,type:{name:"number"}},geometry:{defaultValue:null,description:"The id for a geometry if one is already cached",name:"geometry",required:!1,type:{name:"string | undefined"}},cornerRadius:{defaultValue:null,description:"The desired corner radius if a hexagon needs to be generated",name:"cornerRadius",required:!1,type:{name:"number | undefined"}},horizontal:{defaultValue:null,description:`Should the horizontal variation be used.

If you are providing an id for a cached geometry you should update the geometry id to reflect a different hexagon (hint hint you only need to rotate a hexagon by 30 degrees to change what axis its represented on)`,name:"horizontal",required:!1,type:{name:"boolean | undefined"}},gap:{defaultValue:null,description:"The distance between each cell",name:"gap",required:!1,type:{name:"CSSNumeric | [CSSNumeric] | undefined"}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"string | undefined"}}}}}catch{}const T={component:_,tags:["autodocs"]},i={args:{columns:9,style:{backgroundColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:.05,boxShadow:"0 0 4px #000"},gap:10,cornerRadius:5,children:new Array(50).fill("Hexagon").map((r,o)=>e.jsx("h3",{children:r},o))}},t={args:{columns:9,style:{backgroundColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:.05,boxShadow:"0 0 4px #000"},gap:10,cornerRadius:5,children:new Array(50).fill("Hexagon").map((r,o)=>e.jsx("h3",{children:r},o)),horizontal:!0}};var p,g,f;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    columns: 9,
    style: {
      backgroundColor: 'rgb(28,128,248)',
      borderColor: '#000',
      borderWidth: 0.05,
      boxShadow: '0 0 4px #000'
    },
    gap: 10,
    cornerRadius: 5,
    children: new Array(50).fill("Hexagon").map((c, i) => <h3 key={i}>{c}</h3>)
  }
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,x,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    columns: 9,
    style: {
      backgroundColor: 'rgb(28,128,248)',
      borderColor: '#000',
      borderWidth: 0.05,
      boxShadow: '0 0 4px #000'
    },
    gap: 10,
    cornerRadius: 5,
    children: new Array(50).fill("Hexagon").map((c, i) => <h3 key={i}>{c}</h3>),
    horizontal: true
  }
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};const A=["HexagonVerticalGridExample","HexagonHorizontalGridExample"];export{t as HexagonHorizontalGridExample,i as HexagonVerticalGridExample,A as __namedExportsOrder,T as default};
