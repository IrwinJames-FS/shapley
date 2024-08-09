import { StoryFn, Meta } from "@storybook/react";
import Shape from "./Shape";
import { useMemo } from "react";

export default {
	component: Shape
} as Meta<typeof Shape>;

const Template: StoryFn<typeof Shape> = ({sides, ...args}) =>{
	const s = useMemo(()=>{
		console.log(sides);
		return sides
	}, [sides]);
	return <Shape {...{sides: s, ...args}}/>;
}

export const ShapeTest = Template.bind({});
ShapeTest.args = {
	sides: 3
};