import { Meta, StoryObj } from "@storybook/react";
import { TriangleGridProps } from "./types";
import TriangleGrid from "./TriangleGrid";
import { PolyMorphic } from "../types";

type Props = PolyMorphic<TriangleGridProps, "div">;
export default {
	component: TriangleGrid,
	tags: ['autodocs']
} as Meta<Props>

type Story = StoryObj<Props>;

export const VerticalTriangleGrid: Story = {
	args: {
		columns: 7,
		children: new Array(50).fill("Triangle").map((s,i)=><h3 key={i}>{s}</h3>),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			stroke: '#000',
			strokeWidth: 0.05,
			boxShadow: '0 0 4px #000',
		},
		cornerRadius: 0.05,
		gap:['1rem', '0.5rem']
	}
}

export const HorizontalTriangleGrid: Story = {
	args: {
		columns: 7,
		children: new Array(50).fill("Triangle").map((s,i)=><h3 key={i}>{s}</h3>),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			stroke: '#000',
			strokeWidth: 0.05,
			boxShadow: '0 0 4px #000',
		},
		cornerRadius: 0.025,
		gap:['0.5rem', '1rem'],
		horizontal: true
	}
}