import { Meta, StoryObj } from "@storybook/react";
import { PolyMorphic } from "../types";
import { DiamondGridProps } from "./types";
import DiamondGrid from "./DiamondGrid";

type Props = PolyMorphic<DiamondGridProps, "div">;

export default {
	component: DiamondGrid,
	tags: ['autodocs']
} as Meta<Props>;

type Story = StoryObj<Props>;

/**
 * The diamond grid is nice for custom shapes as it provides a lot of surface area in a less then linear manner.
 */
export const DiamondGridExample: Story = {
	args: {
		columns: 9,
		bgColor: 'rgb(28,128,248)',
		borderColor: '#000',
		borderWidth: 0.05,
		gap: 10,
		cornerRadius: 0.05,
		children: new Array(50).fill("Diamond").map((c,i)=><h3 key={i}>{c}</h3>)
	}
}