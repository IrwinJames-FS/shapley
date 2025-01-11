import { Meta, StoryObj } from "@storybook/react";
import { Glyph, GlyphProps } from "./Glyph";
import { D } from "../../geometry/D";

export default {
	component: Glyph,
	tags: ['autodocs']
} as Meta<GlyphProps>;

type Story = StoryObj<GlyphProps>;
/**
 * Glyphs are simply a way to create anonymous paths within a your dom.
 */
export const Polygon: Story = {
	args: {
		d: D.polygon(6),
		width: '300px'
	}
}
