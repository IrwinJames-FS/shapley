import { Meta, StoryObj } from "@storybook/react";
import { GeometryDefinitionProps } from "./types";
import { GeometryDefinition } from "./GeometryDefinition";
import { Geometry } from "../../geometry";

export default {
	tags: ['autodocs'],
} as Meta<GeometryDefinitionProps>

export const Primary: StoryObj<GeometryDefinitionProps> = {
	args: {
		id: 'geometry-def',
		geometry: Geometry.fromCircle(4),
	},
	render: args => <svg {...{
		className: "geometry-canvas",
		viewBox: "-50 -50 100 100",
	}}>
		<defs>
			<GeometryDefinition {...args}/>
		</defs>
		<use href={`#${args.id}`}/>
	</svg>
}