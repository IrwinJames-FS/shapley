import { Meta, StoryObj } from "@storybook/react";
import PVG, { PVGProps } from './index';



export default {
	component: PVG,
	render: args => <PVG {...args}/>
} as Meta<PVGProps>

type Story = StoryObj<PVGProps>;

export const TrianglePVG: Story = {
	args: {
		d: 'M 0.5 0 L 1,1, L 0,1z',
		pstyle: {
			bgColor: '#F00',
			borderColor: '#0F0'
		}
	}
};
