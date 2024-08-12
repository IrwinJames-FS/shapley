import { Meta, StoryObj } from "@storybook/react";
import TriangleGrid from "./TriangleGrid";
import { TriangleGridProps } from "./types";

type GridProps = TriangleGridProps & {testChildren: number};
export default {
	component: TriangleGrid,
	render: ({testChildren, ...args}) => <TriangleGrid {...args}>
		{new Array(testChildren).fill('').map((_,i)=><p key={i}>{i}</p>)}
	</TriangleGrid>
} as Meta<GridProps>;



type Story = StoryObj<GridProps>;

export const TriangleGridTest: Story = {
	args: {
		testChildren: 10,
		spacing: '2px 6px'
	},
}

export const HorizontalTriangleGridTest: Story = {
	args: {
		testChildren: 100,
		spacing: '2px 6px',
		horizontal: true
	},
}