import { Meta, StoryObj } from "@storybook/react";
import { PolygonicProps } from "./types";
import Polygonic from "./Polygonic";
import Preview from "../Preview";

export default {
	component: Polygonic,
	decorators: Preview,
	tags: ['autodocs']
} as Meta<PolygonicProps>;

type Story = StoryObj<PolygonicProps>;

const defaultProps: Partial<PolygonicProps> = {
	bgColor: 'rgb(28,128,248)',
	borderColor: '#000',
	borderWidth: 0.01,
	shadow: '0 0 4px #000',
	cornerRadius: 0.05
};

export const Triangle: Story = {
	args:{
		sides: 3,
		rotation: 180,
		...defaultProps
	}
};

export const Diamond: Story = {
	args: {
		sides: 4,
		...defaultProps
	}
};

export const Pentagon: Story = {
	args: {
		sides: 5,
		...defaultProps
	}
};

export const Hexagon: Story = {
	args: {
		sides: 6,
		...defaultProps
	}
};

export const Heptagon: Story = {
	args: {
		sides: 7,
		...defaultProps
	}
};

export const Octagon: Story = {
	args: {
		sides: 8,
		...defaultProps
	}
};
