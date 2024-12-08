import { Meta, StoryObj } from "@storybook/react";
import { ShapleyDefinitionProps } from "./types";
import { ShapleyDefinition } from "./ShapleyDefinition";
import { Geometry } from "../../geometry";
export default {
	component: ShapleyDefinition,
	tags: ['autodocs'],
	render: ({id, d})=>{
		return (<svg viewBox="0 0 100 100" width="300px" height="300px">
			<defs>
				<ShapleyDefinition {...{id, d}}/>
			</defs>
			<use href={"#"+id} fill="rgb(28,128,248)" stroke="#000" strokeWidth={3} clipPath={`url("#${id}-clip")`}/>
		</svg>)
	}
} as Meta<ShapleyDefinitionProps>

type Story = StoryObj<ShapleyDefinitionProps>

export const primary: Story = {
	args: {
		id: "test",
		d: "M 50,0 L 100,100 0,100z"
	}
}

/**
 * Just a proof of concept of a simplified implementation of the Geometry class
 */
export const secondary: Story = {
	args: {
		id: "polygon-test",
		d: ''+Geometry.polygon(6, 50)
	}
}