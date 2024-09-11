import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{S as m,P as s,v as g,a,G as p}from"./Points-D1gxx6HH.js";import{P as x}from"./Preview-DVw1oOqN.js";import{P as f}from"./PolygonDefinition-DivdZsVH.js";import"./index-DJO9vBfz.js";const j={component:m,tags:["autodocs"],decorators:x},o={args:{style:{aspectRatio:s.fromCircle(6,Math.PI/30).aspectRatio,width:"100%",...g({shadow:"0 0 4px #000"})},viewBox:"0 0 1 1",defs:e.jsx(f,{id:"hexagon",sides:6,rotation:30,objectBounding:!0}),children:e.jsx(a,{src:"#hexagon",bgColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:.1})}},r={render:()=>e.jsx(m,{viewBox:"0 0 1 1",style:{aspectRatio:s.fromCircle(6).aspectRatio,width:"100%",...g({shadow:"0 0 4px #000"})},defs:e.jsxs(e.Fragment,{children:[e.jsx(f,{id:"small-logo-bg",sides:6,cornerRadius:.03,objectBounding:!0}),e.jsx(p,{id:"small-logo-signet",geometry:new s([1,.75,1,.25,.5,0,0,.25,0,.75,.8,1.35,.8,1.65,.5,1.8,.2,1.65,.2,1.25,0,1.25,0,1.75,.5,2,1,1.75,1,1.25,.2,.65,.2,.35,.5,.2,.8,.35,.8,.75]).normalize().round([0,...new Array(4).fill(.1),...new Array(4).fill(.05),.1,0,...new Array(4).fill(.1),...new Array(4).fill(.05),.1]).scaleByScalar(.6)})]}),children:e.jsxs(e.Fragment,{children:[e.jsx(a,{src:"#small-logo-bg",fill:"rgb(28,128,248)",stroke:"#000",strokeWidth:.1}),e.jsx(a,{x:.2,y:.2,src:"#small-logo-signet",fill:"#000"})]})})};var i,t,l;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    style: {
      aspectRatio: Points.fromCircle(6, Math.PI / 30).aspectRatio,
      width: '100%',
      ...vars({
        shadow: "0 0 4px #000"
      })
    },
    viewBox: '0 0 1 1',
    defs: <PolygonDefinition id="hexagon" sides={6} rotation={30} objectBounding />,
    children: <GeometryRef src="#hexagon" bgColor="rgb(28,128,248)" borderColor="#000" borderWidth={0.1} />
  }
}`,...(l=(t=o.parameters)==null?void 0:t.docs)==null?void 0:l.source}}};var n,d,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    return <SVGCanvas {...{
      viewBox: '0 0 1 1',
      style: {
        aspectRatio: Points.fromCircle(6).aspectRatio,
        width: '100%',
        ...vars({
          shadow: "0 0 4px #000"
        })
      },
      defs: <>
                <PolygonDefinition {...{
          id: 'small-logo-bg',
          sides: 6,
          cornerRadius: 0.03
        }} objectBounding />
                <GeometryDefinition {...{
          id: 'small-logo-signet',
          geometry: new Points([
          //S
          1, 0.75, 1, 0.25, 0.5, 0, 0, 0.25, 0, 0.75, 0.8, 1.35, 0.8, 1.65, 0.5, 1.8, 0.2, 1.65, 0.2, 1.25, 0, 1.25, 0, 1.75, 0.5, 2, 1, 1.75, 1, 1.25, 0.2, 0.65, 0.2, 0.35, 0.5, 0.2, 0.8, 0.35, 0.8, 0.75]).normalize().round([0, ...new Array(4).fill(0.1), ...new Array(4).fill(0.05), 0.1, 0, ...new Array(4).fill(0.1), ...new Array(4).fill(0.05), 0.1]).scaleByScalar(0.6)
        }} />
            </>,
      children: <>
                <GeometryRef {...{
          src: '#small-logo-bg',
          fill: 'rgb(28,128,248)',
          stroke: '#000',
          strokeWidth: 0.1
        }} />
                <GeometryRef {...{
          x: 0.2,
          y: 0.2,
          src: '#small-logo-signet',
          fill: '#000'
        }} />
            </>
    }} />;
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const R=["SVGCanvasExample","SmallLogoExample"];export{o as SVGCanvasExample,r as SmallLogoExample,R as __namedExportsOrder,j as default};
