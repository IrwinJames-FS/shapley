import { Meta, StoryObj } from "@storybook/react";
import { ShapeRef, ShapeRefProps } from "./ShapeRef";
import { ShapeCache } from "../ShapeCache/ShapeCache";
import { D } from "~/src/geometry";

export default {
	component: ShapeRef
} as Meta<ShapeRefProps>

type Story = StoryObj<ShapeRefProps>

export const Primary: Story = {
	args: {},
	render(){
		return (<>
			<ShapeCache shapes={{
				hexagon: D.polygon(6, 1, [0,0], 0, 0.1)
			}} allObjectBounding/>
			<ShapeRef sref="hexagon" fill="rgb(28,128,248)">Test</ShapeRef>
		</>)
	}
}