import { StoryFn, Meta } from "@storybook/react";
import Shape from "./Shape";
import { useMemo } from "react";

export default {
	component: Shape,
	argTypes: {
		as: {
			options: ["div", "a", "h1", "h2", "h3", "h4", "h5", "p", "span"],
			control: {
				type: "select"
			}
		}
	}
} as Meta<typeof Shape>;

const Template: StoryFn<typeof Shape> = ({sides=3, ...args}) => {
	return <div style={{margin: '1rem'}}><Shape {...{sides, ...args}}/></div>;
}

export const ShapeTest = Template.bind({});
ShapeTest.args = {
	sides: 3,
	backgroundColor: "rgb(28,128,248)",
	cornerRadius: 0.05,
	borderColor: "#000",
	borderWidth: 0.02
};