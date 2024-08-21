import { Meta, StoryObj } from "@storybook/react";
import { ShapelyGridProps } from "./types";
import { PolyMorphic } from "../types";
import ShapelyGrid from "./ShapelyGrid";
import { Points } from "../../geometry";
import SVGCache from "../SVGCache/SVGCache";
import PolygonDefinition from "../PolygonDefinition";
import { background } from "storybook/internal/theming";

type ShapelyGridComponentProps = PolyMorphic<ShapelyGridProps, "div">
export default {
	component: ShapelyGrid,
	parameters: {
		
	},
	decorators: Story=>(<>
	<SVGCache>
		<PolygonDefinition id="triangle-odd" sides={3} rotation={180} objectBounding/>
		<PolygonDefinition id="triangle-even" sides={3} rotation={0} objectBounding/>
	</SVGCache>
	<Story/>
	</>),
	tags: ['autodocs']
} as Meta<ShapelyGridComponentProps>;

type Story = StoryObj<ShapelyGridComponentProps>;

/**
 * This method uses the grid component to render a triangle grid. The triangle paths are referenced using ids pointing to clipPath elements in an SVGCache. 
 */
const TriangleColumns = 9;
const TriangleAspectRatio = Points.fromCircle(3).aspectRatio;

export const DefaultGrid: Story = {
	parameters:{
		actions: {disable: true},
		controls: {disable: true},
		backgrounds: {disable: true, grid: {disable: true}},
		outline: {disable: true},
		highlight: {disable: true},
		interactions: {disable: true},
		measure: {disable: true},
		demo: {disable: true}
	}
}
/**
 * The triange grid is one of the trickier ones in my opinion. The while the layout is basically a natural flow I set the width of each cell to be two and the increment for the columns by 1 this will result in each cell overlapping. Then the triangles are rotated to fit in the remaining space without visibly overlapping.
 * 
 * This raised a corner case that resulted in the child being recreated and having 
 */
export const TriangleGrid: Story = {
	args: {
		columns: TriangleColumns,
		columnCell: '1fr',
		columnSuffix: '1fr',
		cellSize: [2, 1],
		aspectRatio: TriangleAspectRatio,
		gap: [10, 5],
		bgColor: 'rgb(28,128,248)',
		borderColor: '#000',
		borderWidth: 0.05,
		shadow: '0 0 4px #000',
		children: new Array(180).fill(<h1>Hello</h1>),
		layout: (i, c)=>{
			const x = i%c;
			const y = Math.floor(i/c);
			return [x, y, (x+y)%2 ? '#triangle-even':'#triangle-odd']
		}
		
	}
}