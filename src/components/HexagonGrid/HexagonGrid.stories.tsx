import { Meta, StoryObj } from "@storybook/react";
import { PolyMorphic } from "../types";
import { HexagonGridProps } from "./types";
import HexagonGrid from "./HexagonGrid";

type Props = PolyMorphic<HexagonGridProps, "div">;

export default {
	component: HexagonGrid,
	tags: ['autodocs']
} as Meta<Props>;

type Story = StoryObj<Props>;

export const HexagonVerticalGridExample: Story = {
	args: {
		columns: 9,
		bgColor: ['rgb(28,128,248)', '#0F0'],
		borderColor: '#000',
		borderWidth: 0.05,
		shadow: '0 0 4px #000',
		gap: 10,
		cornerRadius: 0.025,
		children: new Array(50).fill("Hexagon").map((c,i)=><h3 key={i}>{c}</h3>)
	}
}

export const HexagonHorizontalGridExample: Story = {
	args: {
		columns: 9,
		bgColor: ['rgb(28,128,248)', '#0F0'],
		borderColor: '#000',
		borderWidth: 0.05,
		shadow: '0 0 4px #000',
		gap: 10,
		cornerRadius: 0.025,
		children: new Array(50).fill("Hexagon").map((c,i)=><h3 key={i}>{c}</h3>),
		horizontal: true
	}
}