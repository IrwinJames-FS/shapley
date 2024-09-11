import{j as T}from"./jsx-runtime-CkxqCPlQ.js";import{G as B}from"./Geometric-sZ--qBRS.js";import{P as G,t as C}from"./Points-D1gxx6HH.js";import{P as H}from"./Preview-DVw1oOqN.js";import"./index-DJO9vBfz.js";const i=({sides:d=3,rotation:S=0,cornerRadius:j=0,...I})=>T.jsx(B,{geometry:G.fromCircle(d,C(S)).round(j),...I}),k=i;try{i.displayName="Polygonic",i.__docgenInfo={description:"Polygonic builds a Geometric based on its sides and rotation properties.",displayName:"Polygonic",props:{defs:{defaultValue:null,description:"Simply an alias to an internal &lt;defs&gt;",name:"defs",required:!1,type:{name:"ReactNode"}},viewBox:{defaultValue:null,description:"viewBox is an exising SVG Property however because it is passed as a base property later it seems we need to include it explicitly",name:"viewBox",required:!1,type:{name:"string | undefined"}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"string | undefined"}},objectBounding:{defaultValue:null,description:"If object bounding is pass through the all geometries will be normalized. This is benefitial if using the same path to clip an html element.",name:"objectBounding",required:!1,type:{name:"boolean | undefined"}},aspectRatio:{defaultValue:null,description:"If a pathId is provided this property should also be applied",name:"aspectRatio",required:!1,type:{name:"string | undefined"}},src:{defaultValue:null,description:"Unlike href src is required and will populate both href as well as clip path",name:"src",required:!1,type:{name:"string | undefined"}},clipped:{defaultValue:null,description:"Clipping a shape is not always necessary. but if you are using a clipped definition this can be provided to the ref to instruct it to populate the clip path using shapelys clipping convention.",name:"clipped",required:!1,type:{name:"boolean | undefined"}},components:{defaultValue:null,description:"Components will be a record of prop overrides available.",name:"components",required:!1,type:{name:"GeometricComponents | undefined"}},sides:{defaultValue:{value:"3"},description:"The number of sides the polygon should have",name:"sides",required:!1,type:{name:"number | undefined"}},rotation:{defaultValue:{value:"0"},description:"The degrees the polygon should be rotated",name:"rotation",required:!1,type:{name:"number | undefined"}},cornerRadius:{defaultValue:{value:"0"},description:`The corner radii used to round the corners of the shape.

If a single number is provided the number will be applied to all corners. If an array is provided the corners that are not defined in the array are assumed to be 0.

**Warning**: Most shapes are normalized meaning a corner radius of *0.1* is 10% of the view axis.`,name:"cornerRadius",required:!1,type:{name:"number | number[] | undefined"}}}}}catch{}const W={component:k,decorators:H,tags:["autodocs"]},e={fill:"rgb(28,128,248)",stroke:"#000",strokeWidth:2,shadow:"0 0 4px #000",cornerRadius:.05},a={args:{sides:3,rotation:180,...e}},s={args:{sides:4,...e}},r={args:{sides:5,...e}},n={args:{sides:6,...e}},o={args:{sides:7,...e}},t={args:{sides:8,...e}};var l,p,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    sides: 3,
    rotation: 180,
    ...defaultProps
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var c,m,f;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    sides: 4,
    ...defaultProps
  }
}`,...(f=(m=s.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var g,h,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    sides: 5,
    ...defaultProps
  }
}`,...(y=(h=r.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var b,P,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    sides: 6,
    ...defaultProps
  }
}`,...(v=(P=n.parameters)==null?void 0:P.docs)==null?void 0:v.source}}};var w,x,q;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    sides: 7,
    ...defaultProps
  }
}`,...(q=(x=o.parameters)==null?void 0:x.docs)==null?void 0:q.source}}};var V,_,R;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    sides: 8,
    ...defaultProps
  }
}`,...(R=(_=t.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};const M=["Triangle","Diamond","Pentagon","Hexagon","Heptagon","Octagon"];export{s as Diamond,o as Heptagon,n as Hexagon,t as Octagon,r as Pentagon,a as Triangle,M as __namedExportsOrder,W as default};
