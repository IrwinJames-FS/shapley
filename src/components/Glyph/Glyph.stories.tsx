import { Meta, StoryObj } from "@storybook/react";
import Glyph, { GlyphProps } from "./Glyph";
export default {
	component: Glyph,
	tags: ['autodocs']
} as Meta<GlyphProps>

type Story = StoryObj<GlyphProps>;

export const Primary: Story = {
	args:{
		d: "M 50,0 100,100 0,100z"
	}
}