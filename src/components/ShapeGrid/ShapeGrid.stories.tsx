import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ShapeGrid, ShapeGridProps } from "./ShapeGrid";
import { D } from "../../geometry";
import { ShapeGridCell } from "./ShapeGridCell";

export default {
	component: ShapeGrid,
	tags: ['autodocs']
} as Meta<ShapeGridProps>

type Story = StoryObj<ShapeGridProps>;

export const Primary: Story = {
	args: {
		shapes: {
			hexagon: D.polygon(6)
		},
		cellColumns: 'repeat(6, 1fr 2fr) 1fr',
		cellRows: '1fr',
		cellSize: [3,2],
		children: [
			<ShapeGridCell key="shape1" column={1} row={1} sref="#hexagon" fill="#F00">
				<h1>Test</h1>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2" column={3} row={2} sref="#hexagon" fill="#F00">
				<h1>Test</h1>
			</ShapeGridCell>,
			<ShapeGridCell key="shape1" column={5} row={1} sref="#hexagon" fill="#F00">
				<h1>Test</h1>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2" column={7} row={2} sref="#hexagon" fill="#F00">
				<h1>Test</h1>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2" column={9} row={1} sref="#hexagon" fill="#F00">
				<h1>Test</h1>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2" column={11} row={2} sref="#hexagon" fill="#F00">
				<h1>Test</h1>
			</ShapeGridCell>,
		]
	}
}