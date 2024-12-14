import { Meta, StoryObj } from "@storybook/react";
import Shape, { OverridableComponent } from "./Shape";
import { D } from "~/geometry";

export default {
	component: Shape,
	tags: ['autodocs']
} as Meta<OverridableComponent>

type Story = StoryObj<OverridableComponent>;

export const Primary: Story = {
	args: {
		/**
		 * d can be a string or an instance of D.
		 */
		d: D.polygon(6, 1, [0,0], 0, 0.1),
		/**
		 * To adjust the properties for the use component which renders the shape modify this property
		 */
		useProps: {fill: 'rgb(28,128,248)', stroke: "#000", strokeWidth: 0.025},
		/**
		 * Children can be added like normal
		 */
		children: ["Hello World"],
		/**
		 * All html properties such as style are supported (assuming the base html element supports the property).
		 */
		style:{
			maxWidth: '600px'
		},
		/**
		 * The properties for the underlying svg component can be modified here.
		 */
		svgProps:{
			style:{
				filter: 'drop-shadow(2px 2px 4px #000)'
			}
		}
	}
}