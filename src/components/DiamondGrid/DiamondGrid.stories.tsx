import { Meta, StoryObj } from "@storybook/react";
import DiamondGrid from "./DiamondGrid";
import { DiamondGridProps } from "./types";

type GridProps = DiamondGridProps & {testChildren: number};
export default {
	component: DiamondGrid,
	render: ({testChildren, ...args}) => <DiamondGrid {...args}>
		{new Array(testChildren).fill('').map((_,i)=><p key={i}>{i}</p>)}
	</DiamondGrid>
} as Meta<GridProps>;



type Story = StoryObj<GridProps>;

export const DiamondGridTest: Story = {
	args: {
		testChildren: 10,
		spacing: '2px 6px'
	},
}