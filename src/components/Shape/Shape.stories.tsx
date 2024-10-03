import { Meta, StoryObj } from "@storybook/react/*";
import { ShapeProps } from "./types";
import { Shape } from "./Shape";
import { Geometry } from "../../geometry";

export default {
	component: Shape,
	tags: ['autodocs']
} as Meta<ShapeProps>;

type Story = StoryObj<ShapeProps>

export const Primary: Story = {
	args: {
		geometry: Geometry.fromBuffer([
			100, 75,
			100, 25,
			50, 0,
			0, 25,
			0, 75,
			100, 125,
			100, 175,
			50, 200,
			0, 175,
			0, 125
		])
		.setAutoClose(false),
		components: {
			svg: {
				viewBox: '0 0 100 200',
				overflow: 'visible'
			},
			use: {
				style: {
					fill: 'transparent',
					stroke: "#000",
					strokeWidth: 3
				}
			}
		}
	}
}