import { Meta, StoryObj } from "@storybook/react";
import { GeometryRefProps } from "./types";
import GeometryRef from "./GeometryRef";
import PolygonDefinition from "../PolygonDefinition";
import SVGCanvas from "../SVGCanvas";

export default {
	component: GeometryRef,
	tags: ['autodocs'],
	decorators: Story => (<SVGCanvas {...{
		viewBox: '-50 -50 100 100',
		style:{
			padding: '1rem',
			filter: 'drop-shadow(0 0 4px #000)'
		},
		defs:<>
		<PolygonDefinition id="triangle" sides={3}/>
		<PolygonDefinition id="diamond" sides={4} cornerRadius={10}/>
		<PolygonDefinition id="pentagon" sides={5}objectBounding/>
		<PolygonDefinition id="hexagon" sides={6} objectBounding/>
		<PolygonDefinition id="heptagon" sides={7} objectBounding/>
		<PolygonDefinition id="octagon" sides={8} objectBounding/>
		</>
	}}><Story/></SVGCanvas>)
} as Meta<GeometryRefProps>;

type Story = StoryObj<GeometryRefProps>;

/**
 * The triangle definition is object bounding this means the units for stroke need to be between 0 and 1. where 1 represents the largest value for x and y like a percentage.
 */
export const Triangle: Story = {
	args: {
		src: '#triangle',
		fill: 'rgb(28,128,248)',
		stroke: "#000",
		strokeWidth: 2,
	}
}

export const Square: Story = {
	args: {
		src: '#diamond',
		fill: 'rgb(28,128,248)',
		stroke: '#000',
		strokeWidth: 2,
		strokeLinejoin: 'round'
	}
}

