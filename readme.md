# Shapely
Shapely is a library designed to simplify the rendering of shapes in an html document. Shapely is not a replacement for the full capability of SVG so all components are designed to accept all the properties accepted by the used underlying svg components. With that the Components work greate as foundational elements to build and style from.

## WARNING
Shapely is very much in the early alpha states. Use Shapely at your own risk. That being said during this stage I will be actively addressing issues as quickly as possible. Please let me know if you find any issues and please let me know how to reproduce said issues.  

## Viewing the documentation. 

In the next few weeks I will be hosting the documentation however for now the documentation can be viewed via storybook by running

```
cd node_modules/@irwinproject/shapely/storybook-static
serve
```

if you do not have serve installed you can install it with

```
npm i -g serve
```

This documentation will be removed from the package upon hosting. 
## Getting Started

Install Shapely
```bash
npm install @irwinproject/shapely
```

## Creating your first component.

Lets just make a triangle.

```tsx
import { Triangle } from '@irwinproject/shapely';
const Tri = ()=>(<Triangle {...{
	style: {
		backgroundColor: 'rgb(28,128,248)',
		borderColor: '#000',
		borderWidth: 2
		boxShadow: '0 0 4px #000'
	},
	cornerRadius: 10
}}>)
```
Above we implemented a Triangle component 
When using a Geometry or Polgyon Component the backgroundColor, borderColor, borderWidth, and boxShadow components are intercepted and aliased to the fill, stroke, strokeWidth and backdropFilter properties. with that being said the background and border shorthand properties can still be used to directly interface with a components bounding rect.
Resulting in...


## Overridable

Polygon and Geometry Components tagname can be overriden as well as a large amount of the styling. I will be including a styling section explaining the dos and donts of Shapely.

Lets say we wanted a Hexagon Link to Google.

```tsx
import { Hexagon } from '@irwinproject/shapely';

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
```

Utilizing the as component you can override the tagname very simply. In addition it will update the arguments it accepts.

And just like that you can turn just about any element into a shapely component.

*disclaimer: elements must accept children classname and style to be overriden by and work properly with shapely*

## Styling
### Styling Shapely in JS
Shapely is built using an SVG backing layer and bridges commonly used styling properties to the appropriate property in the svg layer. such as background is an alias of fill and borderColor is an alias of stroke. Additionally I change the typical rendering method of shadows when styling via javascript. This is because the normal box shadow method does not work for non rectangular elements. In the future I may change the naming convention here if there is a desire to be able to apply a box shadow and additional shadows to the defined shape. This allows the typicall styles to be defined. 

### Styling with CSS, SCSS, styled-components, or emotion/styled... or any css based styling solution.
Because I cannot override the default behavior of the css properties I have added css variables that can be added in any parent component to style. Also each component does receive a common class which can be used to apply generic styling to all shapely components. 

It is important to remember many styling libraries package code to a css file instead of using inline styling as such while it may appear to be inline you still must use the css variables instead of the convenience inline methods. 

It is also possible to update the variables from inline styling however if you are using typescript you may need to cast **CSSProperties** to a less strict typing. In the library you can utilize **CSSPropertiesPlusVars** to use css variable names in your styling object. 

With that said here is how we can make a more interactive link using css.
```tsx
const MyAwesomeHexagon = () => {
	return (<Hexagon className="my-awesome-hexagon" as="a" href="https://www.google.com" cornerRadius={10} horizontal>Google</Hexagon>)
}
```

Then style just style it up.

```css
.my-awesome-hexagon {
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
```

Because corner radius requires a modification to the geometry the corner radius cannot be set in css. 

#### Things to avoid
* Avoid using the background properties for the root component in css 
	* These properties are descibing the background color or image of the bounding rect not the Shapely background layer.
	* To change the shapes background color make sure you are updating the *--background-color* css variable.
* Avoid modifying the border properties for the root component in css
	* This properties are describing the border of the bounding rect.
	To change the shapes border utilize the *--border-color* and *--border-width* css variables. 
* Avoid using the box shadow property.
	* As its name describes this property does not take into acount for the background layer. instead utilize the filter or backdropFilter property to apply shadows via css.
	* the *--shadow* css variable is offered as a convenient method to apply the shadow to the background layer from the root of a component in css. however does require use of a *drop-shadow* method or another effect defined by the browser or svg feEffect.
* Avoid changing the positioning property of the root component. 
	* Shapely uses relative and absolute positioning to place the background layer if you need to position a component absolutely it is recommended to wrap the component in an absolutely positioned element.

I say to avoid the above practices because I have not encountered use cases where the above behaviors would be desired. I do not mark any properties as important as such all styling is overridable but may have unintentional effects. 



