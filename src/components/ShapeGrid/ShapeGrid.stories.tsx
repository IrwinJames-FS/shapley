import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {ShapeGridProps, ShapeGrid} from "./ShapeGrid";
import { D } from "../../geometry";
import { ShapeGridCell } from "./ShapeGridCell";
import { HexagonLayout } from "./LayoutFNs";
import { Shape } from "../Shape/Shape";

export default {
	component: ShapeGrid,
	tags: ['autodocs']
} as Meta<ShapeGridProps>

type Story = StoryObj<ShapeGridProps>

export const Hexagon: Story = {
	args: {
		shapes: {hexagon: D.polygon(6, {cornerRadius: 0.1})},
		cellColumns: "repeat(3, 1fr, 2fr) 1fr",
		cellSize: [3,2],
		layoutFn: HexagonLayout(3, 'hexagon',false, true),
		children:(<>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width:"4rem"}}>1</Shape></ShapeGridCell>
		</>)
	}
}

export const HexagonVertical: Story = {
	args: {
		shapes: {hexagonVert: D.polygon(6, {cornerRadius: 0.1, rotation: 30})},
		cellColumns: "repeat(3, 1fr) 1fr",
		cellSize: [2,3],
		layoutFn: HexagonLayout(3, 'hexagonVert',true),
		children:(<>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		<ShapeGridCell style={{padding: '0 0.5rem'}}><Shape fill="rgb(28,128,248)" style={{width: "90%"}}>1</Shape></ShapeGridCell>
		</>)
	}
}