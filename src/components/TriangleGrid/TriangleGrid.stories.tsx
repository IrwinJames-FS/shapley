import { StoryFn, Meta, StoryObj } from "@storybook/react";
import TriangleGrid from "./TriangleGrid";
import { useMemo } from "react";
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
		testChildren: 10
	}
}