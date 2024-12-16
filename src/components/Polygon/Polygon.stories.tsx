import { Meta, StoryObj } from "@storybook/react";
import { Polygon, PolygonProps } from "./Polygon";

export default {
	component: Polygon,
	tags: ['autodocs']
} as Meta<PolygonProps>

type Story = StoryObj<PolygonProps>

export const Triangle: Story = {
	args: {
		sides: 3,
		rotation: 30,
		fill: 'rgb(28,128,248)',
		style: {width: '300px'},
		forceDraw: true
	}
}

export const Diamond: Story = {
	args: {
		sides: 4,
		fill: 'rgb(28,128,248)',
		style: {width: '300px'},
		forceDraw: true
	}
}

export const Pentagon: Story = {
	args: {
		sides: 5,
		rotation: -90,
		fill: 'rgb(28,128,248)',
		style: {width: '300px'},
		forceDraw: true
	}
}

export const Hexagon: Story = {
	args: {
		sides: 6,
		fill: 'rgb(28,128,248)',
		style: {width: '300px'},
		forceDraw: true
	}
}

export const Hexptagon: Story = {
	args: {
		sides: 7,
		rotation: -90,
		fill: 'rgb(28,128,248)',
		style: {width: '300px'},
		forceDraw: true
	}
}

export const Octagon: Story = {
	args: {
		sides: 8,
		fill: 'rgb(28,128,248)',
		style: {width: '300px'},
		forceDraw: true
	}
}