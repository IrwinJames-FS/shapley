import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{P as q}from"./Polygon-DLLa785J.js";import{P as W}from"./Preview-DVw1oOqN.js";import{r as s}from"./index-DJO9vBfz.js";import"./Geometry-B9IE6hHj.js";import"./Geometric-sZ--qBRS.js";import"./Points-D1gxx6HH.js";const V={component:q,decorators:W,tags:["autodocs"]},r={style:{backgroundColor:"rgb(28,128,248)",borderColor:"#000",borderWidth:2,boxShadow:"0 0 4px #000"},cornerRadius:.05},o={render:()=>{const[[n,C],G]=s.useState([3,0]),l=s.useRef(.005);return s.useEffect(()=>{let p=-1;const u=(M=0)=>{G(([k])=>[k+l.current,M/1e3%360*Math.PI/180]),p=window.requestAnimationFrame(u)};return u(),()=>window.cancelAnimationFrame(p)},[]),s.useEffect(()=>{n>=8?l.current=-.005:n<=3&&(l.current=.005)},[n]),e.jsx("div",{style:{height:"25rem",margin:"10rem"},children:e.jsx(q,{sides:n,rotation:C,cornerRadius:.01,...r,children:"Shapely"})})}},a={args:{sides:3,rotation:180,children:e.jsx("h1",{children:"Triangle"}),...r}},t={args:{sides:4,children:e.jsx("h1",{children:"Diamond"}),...r}},i={args:{sides:5,rotation:180,children:e.jsx("h1",{children:"Diamond"}),...r}},d={args:{sides:6,children:e.jsx("h1",{children:"Diamond"}),...r}},c={args:{sides:7,children:e.jsx("h1",{children:"Diamond"}),...r}},m={args:{sides:8,children:e.jsx("h1",{children:"Diamond"}),...r}};var h,g,f;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const d = 0.005;
    const [[sides, rotation], setSides] = useState([3, 0]);
    const dir = useRef(d);
    useEffect(() => {
      let animId = -1;
      const renderShape = (time: number = 0) => {
        setSides(([s]) => [s + dir.current, time / 1e3 % 360 * Math.PI / 180]);
        animId = window.requestAnimationFrame(renderShape);
      };
      renderShape();
      return () => window.cancelAnimationFrame(animId);
    }, []);
    useEffect(() => {
      if (sides >= 8) dir.current = -d;else if (sides <= 3) dir.current = d;
    }, [sides]);
    return <div style={{
      height: '25rem',
      margin: '10rem'
    }}><Polygon sides={sides} rotation={rotation} cornerRadius={0.01} {...defaultProps}>Shapely</Polygon></div>;
  }
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var P,S,x;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    sides: 3,
    rotation: 180,
    children: <h1>Triangle</h1>,
    ...defaultProps
  }
}`,...(x=(S=a.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var w,D,j;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    sides: 4,
    children: <h1>Diamond</h1>,
    ...defaultProps
  }
}`,...(j=(D=t.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var y,E,b;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    sides: 5,
    rotation: 180,
    children: <h1>Diamond</h1>,
    ...defaultProps
  }
}`,...(b=(E=i.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};var I,R,v;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    sides: 6,
    children: <h1>Diamond</h1>,
    ...defaultProps
  }
}`,...(v=(R=d.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};var A,F,H;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    sides: 7,
    children: <h1>Diamond</h1>,
    ...defaultProps
  }
}`,...(H=(F=c.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var T,O,_;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    sides: 8,
    children: <h1>Diamond</h1>,
    ...defaultProps
  }
}`,...(_=(O=m.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};const X=["Growing","Triangle","Diamond","Pentagon","Hexagon","Heptagon","Octagon"];export{t as Diamond,o as Growing,c as Heptagon,d as Hexagon,m as Octagon,i as Pentagon,a as Triangle,X as __namedExportsOrder,V as default};
