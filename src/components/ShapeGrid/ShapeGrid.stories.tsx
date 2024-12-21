import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ShapeGrid, ShapeGridProps } from "./ShapeGrid";
import { D } from "../../geometry";
import { ShapeGridCell } from "./ShapeGridCell";
import { DiamondLayout, HexagonLayout, TriangleLayout } from './LayoutFNs';
import { Shape } from "../Shape/Shape";

import "./ShapeGrid.stories.css";


export default {
	component: ShapeGrid,
	tags: ['autodocs']
} as Meta<ShapeGridProps>

type Story = StoryObj<ShapeGridProps>;

/**
 * The shape grids primary function to create a grid environment where shapes can be laid out.
 * 
 * The grid cell is designed to but clipped by a shape stored in a cache this will allow non rectangular shapes to be laid out and not have the bouding rect for interfering with cover and click detection.
 * 
 * Shapes can be provided directly to the grid at which point it will be cached directly. (As different server side implementations require different caching methods it is recommended shapes be cached using this method only in a client-side only environment.)
 */
export const Primary: Story = {
	args: {
		shapes: {
			hexagon: D.polygon(6).toObjectBounding()
		},
		cellColumns: 'repeat(6, 1fr 2fr) 1fr',
		cellRows: '1fr',
		cellSize: [3,2],
		children: [
			<ShapeGridCell key="shape1" column={1} row={1} sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2" column={3} row={2} sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape3" column={5} row={1} sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape4" column={7} row={2} sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape5" column={9} row={1} sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape6" column={11} row={2} sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
		]
	}
}

export const TriangleHorizontal: Story = {
	args: {
		shapes: {
			tri1: D.polygon(3),
			tri2: D.polygon(3, {rotation: 180})
		},
		cellColumns: 'repeat(6, 1fr 1fr)',
		cellSize: [2,2],
		layoutFn: TriangleLayout(6, true, ['tri1', 'tri2']),
		children: [
			<ShapeGridCell key="shape0">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape1">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape3">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape4">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape5">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape6">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape7">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape8">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape9">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape10">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape11">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
		]
	}
}

export const TriangleVertical: Story = {
	args: {
		shapes: {
			tri3: D.polygon(3, {rotation: 30}).toObjectBounding(),
			tri4: D.polygon(3, {rotation: -30}).toObjectBounding()
		},
		cellColumns: 'repeat(6, 1fr 1fr) 1fr',
		cellSize: [2,2],
		layoutFn: TriangleLayout(6, false,  ['tri3', 'tri4']),
		children: [
			<ShapeGridCell key="shape0">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape1">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape3">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape4">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape5">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape6">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape7">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape8">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape9">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape10">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape11">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape12">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape13">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape14">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape15">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape16">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape17">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape18">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape19">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape20">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape21">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape22">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape23">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
		]
	}

}

export const DiamondGrid: Story = {
	args: {
		shapes: {
			diamond: D.polygon(4).toObjectBounding(),
		},
		cellColumns: 'repeat(6, 1fr 1fr) 1fr',
		cellSize: [2,2],
		layoutFn: DiamondLayout(11, 'diamond'),
		children: [
			<ShapeGridCell key="shape0">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape1">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape3">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape4">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape5">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape6">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape7">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape8">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape9">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape10">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape11">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape12">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape13">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape14">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape15">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape16">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape17">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape18">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape19">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape20">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape21">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
		]
	}
	
}

export const HorizontalHexagon: Story = {
	args: {
		cellColumns: 'repeat(6, 1fr 2fr) 1fr',
		cellRows: '1fr',
		cellSize: [3,2],
		layoutFn: HexagonLayout(6, 'hexagon', false, true),
		children: [
			<ShapeGridCell key="shape0" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape1" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape2" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape3" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape4" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape5" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape6" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape7" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape8" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape9" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape10" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape11" sref="hexagon">
				<Shape fill="rgb(28,128,248)">
					<h2>Test</h2>
				</Shape>
			</ShapeGridCell>,
			<ShapeGridCell key="shape12" sref="hexagon">
			<Shape fill="rgb(28,128,248)">
				<h2>Test</h2>
			</Shape>
		</ShapeGridCell>,
		]
	}
}
