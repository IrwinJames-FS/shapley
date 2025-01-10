# Shapley


Shapley is a component library which uses an svg layer to render components as non rectangular shapes.

## Installation

```
npm install @irwinproject/shapley
```



## How it works. 

Shapley uses an svg as a background layer which references cached path commands to clip and portray components as a custom shape. To accomplish this a lightweight svg path command parser has been implemented and made available which is useful in building animated paths or dynamic renderings in real time. 

## Usage

### Shape Component

The shape component can be used to reference cached shapes and to draw shapes on demand.

##### Props

| Prop | Type | Description |
|:----:|:----:|:-----------:|
| **d** | (optional) string \| [D](#D) | accepts a string of svg path commands or an instance of [D](#D) |
| **pathProps** | (optional) &lcub;&rcub; | if **d** is provided this object can be used to modify the other properties used in the **&lt;path&gt;** component. |
| **sref** | (optional) string | sref is used to reference a cached shape by providing the id assigned to the shape. |
| **fill** | (optional) string | used to directly override the fill property in the underlying **&lt;use&gt;** component
| **stroke** | (optional) string | used to directly override the stroke property in the underlying **&lt;use&gt;** component. |
| **strokeWidth** | (optional) string | used to directly override the strokeWidth property in the underlying **&lt;use&gt;** component. |
| **useProps** | (optional) &lcub;&rcub; | override any additional properties available in the underlying **&lt;use&gt;** component
| **svgProps** | (optional) &lcub;&rcub; | override any properties in the background **&lt;svg&gt;** layer. |

```tsx
import { Shape } from "@irwinproject/shapley";

export const MyComponent = () => {
	return (<Shape 
	className="diamond-styles" 
	as="h4" 
	d="M 0.5,0 1,0.5 0.5,1 0,0.5z">
		Hello World!
	<Shape>);
};
```

### Glyph
A glyph is a component that allows  a sort of canvas to draw with path commands. 

Currently glyphs cant be cached. 

Glyphs accept all the properties a &lt;path&gt; component accepts however *d* also accepts a [D](#D) instance.

#### Additional Props
| Prop | Type | Description |
|:----:|:----:|:-----------:|
|width| (optional) string | The width passed to the underlying svg component. If not provided it will fill its parent intrinsic width. |
| height | (optional) string | The height passed to the underlying svg component. If not provided it will fill its parent intrinsic height. |
| viewBox | (optional) string | The viewBox can be overriden however if no viewBox is provided one will be inferred based upon path commands. (this may cause clipping to strokes when inferred. [D](#D) does have a setMargin method that will assist in preventing this effect.) |
| svgProps | (optional) &lcub;&rcub; | With the exception of the width, height and viewbox props accepted at the root level this object accepts all the properties a **&lt;svg&gt;** component accepts.

```tsx
import { Glyph } from "@irwinproject/shapley";

export const MyGlyph = ()=>{
	return <Glyph d={D.rounded(0, [
		100,75, 0,-50, -50,-25, -50,25, 0,50, 100,50, 0,50, -50,25, -50,-25, 0,-50
	])}>
}
```
### ShapeCache 
A shape cache is a special (invisible) svg component which only contains cached shapes or paths available by reuse.



```tsx
import { ShapeCache, D } from "@irwinproject/shapley";

export const MyCache = () => {
	return (<ShapeCache shapes={{
		hexagon: D.polygon(6, {rotation: 30}).toObjectBounding(),
		pentagon: D.polygon(5, {rotation: 90}).toObjectBounding(),
		diamond: D.polygon(4).toObjectBounding()
	}}>);
}

```
if a cached shape is going to be used as a background layer it is recommended the shape be converted to a [objectBounding](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clipPathUnits) viewBox. (This allows the shape to scale with the bounds of the rectangle.)
```tsx
import { Shape } from "@irwinproject/shapley";

export const Hexagon = () => {
	return (<Shape 
	sref="hexagon">
		Hello World
	</Shape>);
}
```

### Shape Grids
Shape grids are simply css grids with some properties to help layout overlapping bounding recs more simply. 

For a shape grid to work propely either both the grid-column-template and/or grid-row-template will need to be set. either by utilizing the **cellColumns** or the **cellRows** property. (the templates can also be applied directly using css).

The cellSize property is necessary as well. the first value being the number of columns a cell spans while the second is the number of rows a cell spans. (these can be applied directly with css using the **grid-column-end** and **grid-row-end**).

I provide a few layout functions that simplify laying out grids with regular polygons however custom layout functions can be made as well.

```tsx
import { ShapleyGrid, HexagonLayout } from "@irwinproject/shapley";
const GridComponent = () => {
	return (<ShapleyGrid cellColumns="repeat(6, 1fr 2fr) 1fr" cellSize={[3,2]} layoutFN={HexagonLayout(6, 'hexagon')}>
		<ShapleyGridCell>
			{/*...*/}
		</ShapleyGridCell>
		{/* If a layout function is not provided the row, column and shape reference (sref) property can be set directly on the grid cell*/}
		<ShapleyGridCell row={2} column={3} sref="hexagon"></ShapleyGridCell>
	</ShapleyGrid>)
}
```
#### Layout functions

Layout functions are a way to describe a cell position based upon the index. This allows the cells bounding rects to overlap without statically providing cell positioning in css.

Each cell uses a shape to clip its bounding rect to ensure mouse events are triggered on the correct component. 

```ts
type LayoutFN = (index: number) => ({
	row: number,
	column: number,
	sref?: string
})
```

Any functions complying to this pattern can be used to layout grid cells. the index value provided is the sequential index of the component being iterated. 

**Warning**: The Shapley grid only inject these properties into children ShapleyGridCell.
### Styling

The shape component can be styled like most other html elements with a few exceptions

* **Do not use css borders**
	* CSS borders are always rectangular
	* Instead utilize svg's *stroke* properties.
* **Do not use Drop-shadow**
	* Currently using *filter* and *backdrop-filter* on a shapes parent object are the best method to add shadows to shapes.
	* it may be possible to make custom effects such as **&lt;feDropShadow&gt;** that can be applied directly to a shape. I will explore this when time allows.  

The recommended method to style a shape is via css or css-in-js.

#### CSS Variables. 

| Variable Name | example value | Description |
|:--------------|:--------------|------------:|
| --shapley-aspect-ratio | 1/1 | The shapley aspect ratio set thes aspect ratio of any shapley components that inherit this value. |
| --shapley-clip | url('&num;&lt;id to clip path based on shape path&gt;) | Along with shape commands a clip path is also created for each shape which can be used separate from the shape component. (clip paths generated by shapley will use the following naming convention. *&num;&lt;shape id&gt;-clip*) |
| --shapley-filter | blur(8px) | This is an experimental feature I was hoping would provide a convenient method for creating a shadow or blur effect. That being said I may need to revisit this and generate svg based shadows and blurs that will work as expected |
| --shapley-bg-color | &lt;Any CSS supported color &gt; | The shapley bg color is applied to the components use tag's fill property. This can be a convenient method to add an overlay or set. (this variable was added prior to the decision to clip all shapes, it is recommended to utilize css background properties prior to using the fill method.) |
| --shapley-stroke-color | &lt;Any CSS supported color &gt; | The color to be used to stroke the shape.
| --shapley-stroke-width | 0.1 | The width of the svg stroke. |
| --shapley-stroke-linejoin | round | The line join property of the path or use tag |
| --shapley-stroke-linecap | round | The line cap property of the path or use tag |
| --grid-column | 1 | The column start index for a ShapeGridCell. |
| --grid-row | 1 | The row start index for a ShapeGridCell. |
| --shape-height | 2 | The number of Grid cells  the shape occupies vertically. |
| --shape-width | 3 | The number of Grid cells the shape occupies horizontally. |

#### ### Classes

| Classname | description |
|:----------|------------:|
| .shapley-shape | applies the aspect ratio clip path and display properties of the root component and applies styled to the svg background layer |
| .shapley-shape-bg | This class is used to identify a the svg background layer however css rules are only applied if its the immediate child of a .shapley-shape |
| .shapley-cache | This class is used to identify a shapley cache. by default this hides the cache visibly and removes any intrinsic dimensions. It also makes the cache a fixed component so it does not effect the layout of sibling components. |
| .shapley-grid | The class used to identify a Shape Grid |
| .shapley-grid-cell | The class used to identify a Shape Grid Cell |


### D

D is an attempt to make svg path commands a bit more useful in javascript. 

D acts as a sort of lazy buffer which combines mutation operations to be performed the next time the path commands are requested for render.

D and all of its subsequent classes are convertable to a string which will result in a valid path command string. 

for D to work as it should its backing store holds a IterableIterator (generator) instead of an array of points. this allows for multiple source of truth formats to be applicable. The simplest way to explain this is the source of truth can be anything your providing the instructions on how to traverse that source of truth. 

This has two effects. generators can be combined to essencially enqueue modifications to occur in the next render cycle. Additionally, Path commands can be generated programmatically, via static string, or even with arbitrary types such as a flat array of numbers.

Some limitations include:
* Number of points within the buffer is unknown
* Points can only be iterated in order if reference to separate points is desired two iterations will be necessary to index the points. 


I will be releasing more detailed documentation soon. 
#### constructor
Typically a static method would be used to create a **D** instance. the constructor accepts multiple types. 

**arg**: string | number[] | Command[] | ()=>Generator&lt;Command&gt; 
- the initializer type.
- If a string is provided to first argument it will be parsed as a path command. The source of truth will be the string and each time its iterated.
- If a number array is provided the array will be iterated over by two concluding with a z command to close the shape.
- If a Command Generator is provided you have direct control over the PathCommand instances. (Currently these classes are experimental I will release more documentation soon.).

**margin**: number

This value will be applied to each side of the view box. 

#### properties
| Property | Type | Description |
|:--------:|:----:|:-----------:|
|**firstPosition**| (optional) Point | This property is used during the render cycle to track the point a z tag will close to. this value will only be populated during a the render cycle. |
|**currentPosition?:**| (optional) Point | This property acts as a cursor tracking the current position the iterator is at during the render cycle. This value will only be populated during the render cycle similar to the *firstPosition* property. |
| **bounds** | [minX: number, minY: number, width: number, height: number, maxX:number, maxY: number] | Each time D is stringified it will generate an intrinsic bounds based on the contained points. As such the instance must be converted to a string prior to this being called for its values to be valid. |
| **margin** | number = 0 | Due to the D property not being knowledgable of any specific styling properties this allows a margin to be applied to each side of the path. |
| **viewBox** | string | This is a getter and cannot be overriden. This value reflects the svg viewBox specific to this path. |
| **aspectRatio** | string | This is a getter however has the ability to be overriden. This becomes important when working with a non linear unit system such as objectBoundingUnits. while the maxX and Y are both 1 this does not mean the shape is square in such circumstances. This property is used to maintain the aspect ratio despite if the path is using non linear units. 
| **isObjectBounding** | boolean | This property can be used to check if the values in the path comply with an object bounding path. |
| **setMargin** | this | applies a margin value. |

#### methods
| Property | Return | Description |
|:--------:|:----:|:-----------:|
| **getBounds** | [minX: number, minY: number, width: number, height: number, maxX:number, maxY: number] | This method can be used to get the bounds even if the path has not yet been measured. |
| **each** | Generator<Command> | An iterator that as it iterates updates the cursor, bounds and subsequently the viewbox.
| **translate(x:number, y:number)** | this | translates points. This becomes a bit complicated because absolute and relative positions are translated differently. As such this translates all absolutely positioned points and if the first command is a **m** command it to will be translated. |
| **scale(x:number, y:number)** | this | scales points based on an x and y value. |
| **toObjectBounding()** | this | Converts a non object bounding path to an object bounding units. |
| **cached()** | {d: string, aspectRatio: string, objectBounding: boolean} | A cached item is the passing of the minimum amount of information to a simple json object which can be used to regenerate the instance on another platform. |
| **toString()** | string | Converts the instance to a path command string |

#### Static methods
D has a range of static methods to assist in initializing and creating various shapes.
| Property | Return | Description |
|:--------:|:----:|:-----------:|
| **parse(d: string)** | **Generator&lt;Command&gt;** | parse a path command string to an instance of D. |
| **fromLines(d: number[])** | **Generator&lt;Command&gt;** | treats the array as a 2d vertex list of points. |
| **polygon(sides: number, options?: &lcub;&rcub;)** | **D** | Generate a regular polygon of the provided number of sides. this method supportes decimal values in the side to assist with animation. |
| **polygon.options.radius** | number = 1 | The circumradius of the polygon |
| **polygon.options.rotation** | number = 0 | Degrees the object should be rotated by. |
| **center** | [**x**:number, **y**: number] = [0,0] | The center point of the polygon. |
| **cornerRadius** | number = 0 | The distance from the polygon's points at which rounding should begin. |
| **connectAll** | boolean = false | Connecting all the points just creates an interesting effect so I figured why not.  |
| **shape(cornerRadius: number, points: ()=>Generator([x: number, y: number]) \| number[])** | **D** | Creates a shape from an iterator of points or an Array. |
| **rounded(cornerRadius: number, d: readonly number[])** | **D** | Iterates of a vertex list and rounds each corner by the provided amount. |
| **fromCached(cache: **DCacheItem**)** | **D** | recreate a D instance from a cache object. |

