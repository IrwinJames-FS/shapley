import { Meta, StoryObj } from "@storybook/react";
import { Shape, ShapeProps } from "./Shape";
import { D } from "~/src/geometry/D";
import { ShapeCache } from "../ShapeCache/ShapeCache";
import { background } from "storybook/internal/theming";

export default {
	component: Shape,
	tags: ['autodocs']
} as Meta<ShapeProps>

type Story = StoryObj<ShapeProps>;

export const Primary: Story = {
	args: {
		/**
		 * d can be a string or an instance of D.
		 */
		d: D.polygon(6, 1, [0,0], 0, 0.1).toObjectBounding(),
		/**
		 * To adjust the properties for the use component which renders the shape modify this property
		 */
		useProps: {fill: '#FF0', stroke: "#00F", strokeWidth: 0.025},
		/**
		 * Children can be added like normal
		 */
		children: ["Hello World"],
		/**
		 * All html properties such as style are supported (assuming the base html element supports the property).
		 */
		style:{
			maxWidth: '600px',
			background: "#0F0"
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

/**
 * Shapes can also be loaded from shapes that have been cached in a ShapeCache
 */
export const Secondary: Story = {
	args: {
		/**
		 * To adjust the properties for the use component which renders the shape modify this property
		 */
		useProps: {stroke: "#000", strokeWidth: 0.025},
		/**
		 * Children can be added like normal
		 */
		children: ["Hello World"],
		/**
		 * All html properties such as style are supported (assuming the base html element supports the property).
		 */
		style:{
			maxWidth: '600px',
			backgroundColor: '#F00'
		},
		/**
		 * The properties for the underlying svg component can be modified here.
		 */
		svgProps:{
			style:{
				filter: 'drop-shadow(2px 2px 4px #000)'
			}
		}
	},
	render(props:Omit<ShapeProps, "sref">){
		return (<>
			<ShapeCache shapes={{
				hexagon: D.polygon(6).toObjectBounding()
			}}/>
			<Shape sref="hexagon"  {...props}>Hello, World</Shape>
		</>)
	}
}