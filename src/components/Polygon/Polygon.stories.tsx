import { Meta, StoryObj } from "@storybook/react";
import { PolygonProps } from "./types";
import Polygon from "./Polygon";
import Preview from "../Preview";
import { PolyMorphic } from "../types";

type Poly = PolyMorphic<PolygonProps, "div">
export default {
	component: Polygon,
	decorators: Preview,
	tags: ['autodocs']
} as Meta<Poly>;

type Story = StoryObj<Poly>;

const defaultProps: Partial<Poly> = {
	bgColor: 'rgb(28,128,248)',
	borderColor: '#000',
	borderWidth: 0.01,
	shadow: '0 0 4px #000',
	cornerRadius: 0.05
}

export const Triangle: Story = {
	args: {
		sides: 3,
		rotation: 180,
		children: <h1>Triangle</h1>,
		...defaultProps
	}
};

export const Diamond: Story = {
	args: {
		sides: 4,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Pentagon: Story = {
	args: {
		sides: 5,
		rotation: 180,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Hexagon: Story = {
	args: {
		sides: 6,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Heptagon: Story = {
	args: {
		sides: 7,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Octagon: Story = {
	args: {
		sides: 8,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};