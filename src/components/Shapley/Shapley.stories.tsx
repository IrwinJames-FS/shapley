import { Meta, StoryObj } from "@storybook/react";
import { Shapley } from "./Shapley";
import { ShapleyProps } from "./types";
import { Geometry } from "~/geometry";

export default {
	component: Shapley
} as Meta<ShapleyProps>

type Story = StoryObj<ShapleyProps>;

export const Primary: Story = {
	args: {
		children: <path d={''+new Geometry("M 100,0 100,100 0,100z")}/>,
		/**
		 * By default the svgs fill value is inherited by all children.
		 */
		fill: "rgb(28,128,248)",
		/**
		 * By default the svgs stroke value is inherited by all children.
		 */
		width: "300px",
		height: "300px",
	}
}