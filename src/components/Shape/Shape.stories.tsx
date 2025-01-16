import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Shape, ShapeProps } from "./Shape";
import { D } from "../../geometry";
import { ShapeCache } from "../ShapeCache";

export default {
	component: Shape,
	tags: ['autodocs'],
} as Meta<ShapeProps>

type Story = StoryObj<ShapeProps>

export const Primary: Story = {
	args: {
		d: D.polygon(6),
		children: "Hello World!",
		fill: 'rgb(28,128,248)',
		stroke: "#000",
		strokeWidth: 0.1
	}

}

export const Cached: Story = {
	args: {
		sref: "triangle",
		fill: 'rgb(28,128,248)',
		children: "Triangles are Fun!",
		style:{
			width: "600px"
		}
	},
	render: ({sref="triangle", ...props})=>{
		return (<><ShapeCache shapes={{[sref]:D.polygon(3).toObjectBounding()}}/>
		<Shape sref={sref} {...props}/>
		</>)
		
	}
}