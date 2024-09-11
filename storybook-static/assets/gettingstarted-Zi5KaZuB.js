import{j as e}from"./jsx-runtime-CkxqCPlQ.js";import{useMDXComponents as s}from"./index-BrnU7xv7.js";import{ae as i,af as o}from"./index-DryY4Ina.js";import{FirstExample as a,SecondExample as l,ThirdExample as d}from"./gettingstarted.stories-D-2JOjND.js";import"./index-DJO9vBfz.js";import"./iframe-DulR_S7U.js";import"../sb-preview/runtime.js";import"./index-DLC2J04D.js";import"./index-D-8MO0q_.js";import"./index-0wbOH00J.js";import"./index-DrFu-skq.js";import"./DiamondGrid-Kz3_HR52.js";import"./ShapelyGrid-CjDbm5JN.js";import"./Points-D1gxx6HH.js";import"./Geometric-sZ--qBRS.js";import"./SVGCache-CuVmUNdE.js";import"./PolygonDefinition-DivdZsVH.js";import"./Geometry-B9IE6hHj.js";import"./Polygon-DLLa785J.js";import"./TriangleGrid-Pj2tt2U5.js";function r(t){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started"}),`
`,e.jsx(n.h1,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @irwinproject/shapely
`})}),`
`,e.jsx(n.h2,{id:"creating-your-first-component",children:"Creating your first component."}),`
`,e.jsx(n.p,{children:"Lets just make a triangle."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Triangle } from '@irwinproject/shapely';
const Tri = ()=>(<Triangle {...{
	style: {
		backgroundColor: 'rgb(28,128,248)',
		borderColor: '#000',
		borderWidth: 2
		boxShadow: '0 0 4px #000'
	},
	cornerRadius: 10
}}>)
`})}),`
`,e.jsx(n.p,{children:`Above we implemented a Triangle component
When using a Geometry or Polgyon Component the backgroundColor, borderColor, borderWidth, and boxShadow components are intercepted and aliased to the fill, stroke, strokeWidth and backdropFilter properties. with that being said the background and border shorthand properties can still be used to directly interface with a components bounding rect.
Resulting in...`}),`
`,e.jsx(o,{of:a}),`
`,e.jsx(n.h2,{id:"overridable",children:"Overridable"}),`
`,e.jsx(n.p,{children:"Polygon and Geometry Components tagname can be overriden as well as a large amount of the styling. I will be including a styling section explaining the dos and donts of Shapely."}),`
`,e.jsx(n.p,{children:"Lets say we wanted a Hexagon Link to Google."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Hexagon } from '@irwinproject/shapely';

const HexLink = ()=>(<Hexagon {...{
	as: "a",
	href: "https://www.google.com",
	style: {
		backgroundColor: "rgb(28,128,248)",
		borderColor: "#000",
		borderWidth: 2,
		boxShadow: "0 0 4px #000",
		padding: "2rem"
	},
	cornerRadius: 10
}} horizontal>Google</Hexagon>);
`})}),`
`,e.jsx(n.p,{children:"Utilizing the as component you can override the tagname very simply. In addition it will update the arguments it accepts."}),`
`,e.jsx(o,{of:l}),`
`,e.jsx(n.p,{children:"And just like that you can turn just about any element into a shapely component."}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"disclaimer: elements must accept children classname and style to be overriden by and work properly with shapely"})}),`
`,e.jsx(n.h2,{id:"styling",children:"Styling"}),`
`,e.jsx(n.h3,{id:"styling-shapely-in-js",children:"Styling Shapely in JS"}),`
`,e.jsx(n.p,{children:"Shapely is built using an SVG backing layer and bridges commonly used styling properties to the appropriate property in the svg layer. such as background is an alias of fill and borderColor is an alias of stroke. Additionally I change the typical rendering method of shadows when styling via javascript. This is because the normal box shadow method does not work for non rectangular elements. In the future I may change the naming convention here if there is a desire to be able to apply a box shadow and additional shadows to the defined shape. This allows the typicall styles to be defined."}),`
`,e.jsx(n.h3,{id:"styling-with-css-scss-styled-components-or-emotionstyled-or-any-css-based-styling-solution",children:"Styling with CSS, SCSS, styled-components, or emotion/styled... or any css based styling solution."}),`
`,e.jsx(n.p,{children:"Because I cannot override the default behavior of the css properties I have added css variables that can be added in any parent component to style. Also each component does receive a common class which can be used to apply generic styling to all shapely components."}),`
`,e.jsx(n.p,{children:"It is important to remember many styling libraries package code to a css file instead of using inline styling as such while it may appear to be inline you still must use the css variables instead of the convenience inline methods."}),`
`,e.jsxs(n.p,{children:["It is also possible to update the variables from inline styling however if you are using typescript you may need to cast ",e.jsx(n.strong,{children:"CSSProperties"})," to a less strict typing. In the library you can utilize ",e.jsx(n.strong,{children:"CSSPropertiesPlusVars"})," to use css variable names in your styling object."]}),`
`,e.jsx(n.p,{children:"With that said here is how we can make a more interactive link using css."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const MyAwesomeHexagon = () => {
	return (<Hexagon className="my-awesome-hexagon" as="a" href="https://www.google.com" cornerRadius={10} horizontal>Google</Hexagon>)
}
`})}),`
`,e.jsx(n.p,{children:"Then style just style it up."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-awesome-hexagon {
	--background-color: rgb(28,128,248);
	--border-color: #FFF;
	--border-width: 2;
	--shadow: drop-shadow(0 0 4px #000);
	transition: 1s transform; /* Smooth */
	padding: 1rem;
	color:#FFF;
}

.my-awesome-hexagon:hover{
	--shadow: drop-shadow(0 0 2px #000);
	--background-color: rgb(48,148,255);
	animation: rotate 5s linear infinite;
}

@keyframes rotate {
	0% {
		transform: rotate(1deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
`})}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(n.p,{children:"Because corner radius requires a modification to the geometry the corner radius cannot be set in css."}),`
`,e.jsx(n.h4,{id:"things-to-avoid",children:"Things to avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Avoid using the background properties for the root component in css",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"These properties are descibing the background color or image of the bounding rect not the Shapely background layer."}),`
`,e.jsxs(n.li,{children:["To change the shapes background color make sure you are updating the ",e.jsx(n.em,{children:"--background-color"})," css variable."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Avoid modifying the border properties for the root component in css",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`This properties are describing the border of the bounding rect.
To change the shapes border utilize the `,e.jsx(n.em,{children:"--border-color"})," and ",e.jsx(n.em,{children:"--border-width"})," css variables."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Avoid using the box shadow property.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"As its name describes this property does not take into acount for the background layer. instead utilize the filter or backdropFilter property to apply shadows via css."}),`
`,e.jsxs(n.li,{children:["the ",e.jsx(n.em,{children:"--shadow"})," css variable is offered as a convenient method to apply the shadow to the background layer from the root of a component in css. however does require use of a ",e.jsx(n.em,{children:"drop-shadow"})," method or another effect defined by the browser or svg feEffect."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Avoid changing the positioning property of the root component.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Shapely uses relative and absolute positioning to place the background layer if you need to position a component absolutely it is recommended to wrap the component in an absolutely positioned element."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"I say to avoid the above practices because I have not encountered use cases where the above behaviors would be desired. I do not mark any properties as important as such all styling is overridable but may have unintentional effects."})]})}function G(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{G as default};
