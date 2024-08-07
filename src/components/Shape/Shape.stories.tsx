import { StoryFn, Meta } from "@storybook/react";
import Shape from "./Shape";

export default {
	title: "Shapely/Shape",
	component: Shape
} as Meta<typeof Shape>;

const Template: StoryFn<typeof Shape> = args => <Shape {...args}/>;

export const ShapeTest = Template.bind({});
ShapeTest.args = {};