import { Meta, StoryObj } from "@storybook/react";
import Shape from "./Shape";
import { ElementType } from "react";
import { PolyMorphic } from "../PolyMorph/types";
import { ShapeProps } from "./types";

type PolyShape<T extends ElementType = "div"> = PolyMorphic<ShapeProps, T>
export default {
	component: Shape,
	render: args => <Shape {...args}/>
} as Meta<PolyShape>

type Story = StoryObj<PolyShape>;

export const TriangleShape: Story = {
	args: {
		sides: 3,
		backgroundColor: "rgb(68,168,255)",
		borderWidth: 0.01,
		borderColor: "#000",
		shadow: "0px 0px 5px #000",
		rotation: 180,
		cornerRadius: 0.1,
		children: "Triangle"
	}
};
