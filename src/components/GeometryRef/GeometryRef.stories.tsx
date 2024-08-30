import { Meta, StoryObj } from "@storybook/react";
import { GeometryRefProps } from "./types";
import GeometryRef from "./GeometryRef";
import PolygonDefinition from "../PolygonDefinition";
import SVGCanvas from "../SVGCanvas";

export default {
	component: GeometryRef,
	tags: ['autodocs'],
	decorators: Story => (<SVGCanvas {...{
		viewBox: '0 0 1 1',
		defs:<>
		<PolygonDefinition id="triangle" sides={3} objectBounding/>
		<PolygonDefinition id="diamond" sides={4} objectBounding/>
		<PolygonDefinition id="pentagon" sides={5}objectBounding/>
		<PolygonDefinition id="hexagon" sides={6} objectBounding/>
		<PolygonDefinition id="heptagon" sides={7} objectBounding/>
		<PolygonDefinition id="octagon" sides={8} objectBounding/>
		</>
	}}><Story/></SVGCanvas>)
} as Meta<GeometryRefProps>;

type Story = StoryObj<GeometryRefProps>;

export const Triangle: Story = {
	args: {
		src: '#triangle',
		bgColor: 'rgb(28,128,248)'
	}
}