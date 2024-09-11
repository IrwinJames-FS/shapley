import{j as r}from"./jsx-runtime-CkxqCPlQ.js";import{S as T}from"./ShapelyGrid-CjDbm5JN.js";import{G as v,P as d}from"./Points-D1gxx6HH.js";import{S as D}from"./SVGCache-CuVmUNdE.js";import{P as l}from"./PolygonDefinition-DivdZsVH.js";import"./index-DJO9vBfz.js";import"./Geometric-sZ--qBRS.js";const I={component:T,parameters:{},decorators:e=>r.jsxs(r.Fragment,{children:[r.jsxs(D,{children:[r.jsx(v,{id:"triangle-odd",geometry:d.fromCircle(3,Math.PI).round(5),objectBounding:!0}),r.jsx(l,{id:"triangle-even",sides:3,rotation:0,cornerRadius:5,objectBounding:!0}),r.jsx(l,{id:"diamond",sides:4,objectBounding:!0}),r.jsx(l,{id:"hexagon",sides:6,rotation:30,objectBounding:!0})]}),r.jsx(e,{})]}),tags:["autodocs"]},c=7,k=d.fromCircle(3).aspectRatio,t={parameters:{actions:{disable:!0},controls:{disable:!0},backgrounds:{disable:!0,grid:{disable:!0}},outline:{disable:!0},highlight:{disable:!0},interactions:{disable:!0},measure:{disable:!0},demo:{disable:!0}}},i={args:{columns:c,columnCell:"1fr",columnSuffix:"1fr",cellSize:[2,1],aspectRatio:k,gap:["1rem","0.5rem"],style:{backgroundColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:.05,boxShadow:"0 0 4px #000"},children:new Array(180).fill(r.jsx("div",{children:"Hello"})),layout:(e,o)=>{const a=e%o,u=Math.floor(e/o);return[a,u,(a+u)%2?"#triangle-even":"#triangle-odd"]}}},n={args:{columns:c,columnCell:"1fr",columnSuffix:"1fr",cellSize:[2,2],aspectRatio:"1/1",gap:["1rem","0.5rem"],style:{backgroundColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:.05,boxShadow:"0 0 4px #000"},children:new Array(180).fill(r.jsx("h1",{children:"Diamonds"})),layout:(e,o)=>{const a=e%o;return[a,Math.floor(e/o)*2+(a+1)%2,"#diamond"]}}},s={args:{columns:c,columnCell:"1fr 2fr",columnSuffix:"1fr",cellSize:[3,2],aspectRatio:d.fromCircle(6,Math.PI/6).aspectRatio,gap:10,style:{backgroundColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:.05,boxShadow:"0 0 4px #000"},children:new Array(180).fill(r.jsx("h1",{children:"Diamonds"})),layout:(e,o)=>{const a=e%o;return[a*2,Math.floor(e/o)*2+(a+1)%2,"#hexagon"]}}};var m,g,h;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    actions: {
      disable: true
    },
    controls: {
      disable: true
    },
    backgrounds: {
      disable: true,
      grid: {
        disable: true
      }
    },
    outline: {
      disable: true
    },
    highlight: {
      disable: true
    },
    interactions: {
      disable: true
    },
    measure: {
      disable: true
    },
    demo: {
      disable: true
    }
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var p,b,f,x,y;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    columns: TriangleColumns,
    columnCell: '1fr',
    columnSuffix: '1fr',
    cellSize: [2, 1],
    aspectRatio: TriangleAspectRatio,
    gap: ['1rem', '0.5rem'],
    style: {
      backgroundColor: "rgb(28,128,248)",
      borderColor: "#000",
      borderWidth: 0.05,
      boxShadow: "0 0 4px #000"
    },
    children: new Array(180).fill(<div>Hello</div>),
    layout: (i, c) => {
      const x = i % c;
      const y = Math.floor(i / c);
      return [x, y, (x + y) % 2 ? '#triangle-even' : '#triangle-odd'];
    }
  }
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source},description:{story:`The triange grid is one of the trickier ones in my opinion. The while the layout is basically a natural flow I set the width of each cell to be two and the increment for the columns by 1 this will result in each cell overlapping. Then the triangles are rotated to fit in the remaining space without visibly overlapping.

This raised a corner case that resulted in the child being recreated and having`,...(y=(x=i.parameters)==null?void 0:x.docs)==null?void 0:y.description}}};var C,S,w;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    columns: TriangleColumns,
    columnCell: '1fr',
    columnSuffix: '1fr',
    cellSize: [2, 2],
    aspectRatio: '1/1',
    gap: ['1rem', '0.5rem'],
    style: {
      backgroundColor: "rgb(28,128,248)",
      borderColor: "#000",
      borderWidth: 0.05,
      boxShadow: "0 0 4px #000"
    },
    children: new Array(180).fill(<h1>Diamonds</h1>),
    layout: (i, c) => {
      const x = i % c;
      return [x, Math.floor(i / c) * 2 + (x + 1) % 2, '#diamond'];
    }
  }
}`,...(w=(S=n.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var j,G,R;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    columns: TriangleColumns,
    columnCell: '1fr 2fr',
    columnSuffix: '1fr',
    cellSize: [3, 2],
    aspectRatio: Points.fromCircle(6, Math.PI / 6).aspectRatio,
    gap: 10,
    style: {
      backgroundColor: "rgb(28,128,248)",
      borderColor: "#000",
      borderWidth: 0.05,
      boxShadow: "0 0 4px #000"
    },
    children: new Array(180).fill(<h1>Diamonds</h1>),
    layout: (i, c) => {
      const x = i % c;
      return [x * 2, Math.floor(i / c) * 2 + (x + 1) % 2, '#hexagon'];
    }
  }
}`,...(R=(G=s.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const _=["DefaultGrid","TriangleGrid","DiamondGrid","HexagonGrid"];export{t as DefaultGrid,n as DiamondGrid,s as HexagonGrid,i as TriangleGrid,_ as __namedExportsOrder,I as default};
