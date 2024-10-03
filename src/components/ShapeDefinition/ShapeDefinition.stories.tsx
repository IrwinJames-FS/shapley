import { Meta, StoryObj } from "@storybook/react";
import { ShapeDefinitionProps } from "./types";
import { ShapeDefinition } from "./ShapeDefinition";
import { Geometry } from "../../geometry";

export default {
	component: ShapeDefinition,
	tags: ['autodocs']
} as Meta<ShapeDefinitionProps>

type Story = StoryObj<ShapeDefinitionProps>;

export const Primary: Story = {
	args: {
		geometry: Geometry.fromCircle(4)
	}
}