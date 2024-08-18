import { Meta, StoryObj } from "@storybook/react";
import { ShapelyGridProps } from "./types";
import { PolyMorphic } from "../types";
import ShapelyGrid from "./ShapelyGrid";
import SVGCache from "../SVGCache/SVGCache";
import PolygonDefinition from "../PolygonDefinition";
import { Points } from "../../geometry";
import Geometry from "../Geometry/Geometry";

type ShapelyGridComponentProps = PolyMorphic<ShapelyGridProps, "div">
export default {
	component: ShapelyGrid,
	decorators: Story=>(<>
	<SVGCache>
		<PolygonDefinition id="triangle-even" sides={3} rotation={180} objectBounding/>
		<PolygonDefinition id="triangle-odd" sides={3} objectBounding/>
	</SVGCache>
	<Story/>
	</>),
	tags: ['autodocs']
} as Meta<ShapelyGridComponentProps>;

type Story = StoryObj<ShapelyGridComponentProps>;

/**
 * This method uses the grid component to render a triangle grid. The triangle paths are referenced using ids pointing to clipPath elements in an SVGCache. 
 */
const triangleAspectRatio = Points.fromCircle(3).aspectRatio
export const TriangleGrid: Story = {
	args: {
		children: new Array(180).fill(<Geometry as="h1" src=""),
		/**
	 	* The number of columns that exists in a row
	 	*/
		columns: 9,
		columnCell: '1fr',
		columnSuffix: '1fr',
		cellSize: [2, 1],
		aspectRatio: Points.fromCircle(3).aspectRatio,
		layout: (i, size) => {
			const c = i%size;
			const r = Math.floor(i/size);
			const isOdd = Boolean((c+r)%2);
			return {
				gridColumnStart: c+1,
				gridRowStart: r+1,
				'--clip-path': `url(#triangle-${isOdd ? 'odd':'even'}-clip)`, //because css starts at 1 it means 0 is odd 
				backgroundColor: isOdd ? '#F00':'#00F'
			}
		}
	}
}