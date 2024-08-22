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
		bgColor: 'rgb(28,128,248)',
		borderColor: '#000',
		borderWidth: 0.05,
		cornerRadius: 0.025,
		shadow: '0 0 4px #000',
		gap:10
	}
}

export const HorizontalTriangleGrid: Story = {
	args: {
		columns: 7,
		children: new Array(50).fill("Triangle").map((s,i)=><h3 key={i}>{s}</h3>),
		bgColor: 'rgb(28,128,248)',
		borderColor: '#000',
		borderWidth: 0.05,
		cornerRadius: 0.025,
		shadow: '0 0 4px #000',
		gap:[5,10],
		horizontal: true
	}
}