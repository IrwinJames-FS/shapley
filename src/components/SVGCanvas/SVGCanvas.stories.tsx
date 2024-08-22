import { Meta, StoryObj } from "@storybook/react";
import { SVGCanvasProps } from "./types";
import SVGCanvas from "./SVGCanvas";
import Preview from "../Preview";
import PolygonDefinition from "../PolygonDefinition";
import GeometryRef from "../GeometryRef";
import { vars } from "../../utilities";
import { Points } from "../../geometry";

export default {
	component: SVGCanvas,
	tags: ['autodocs'],
	decorators: Preview
} as Meta<SVGCanvasProps>;

type Story = StoryObj<SVGCanvasProps>

export const SVGCanvasExample: Story = {
	args: {

		style: {
			aspectRatio: Points.fromCircle(6, Math.PI/30).aspectRatio,
			width: '100%',
			...vars({shadow:"0 0 4px #000"})
		},
		viewBox: '0 0 1 1',
		defs: <PolygonDefinition id="hexagon" sides={6} rotation={30} objectBounding/>,
		children: <GeometryRef src="#hexagon" bgColor="rgb(28,128,248)" borderColor="#000" borderWidth={0.1} />
	}
};

