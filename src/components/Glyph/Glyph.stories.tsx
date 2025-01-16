import { Meta, StoryObj } from "@storybook/react";
import { Glyph, GlyphProps } from "./Glyph";
import { D } from "../../geometry/D";

export default {
	component: Glyph,
	tags: ['autodocs']
} as Meta<GlyphProps>;

type Story = StoryObj<GlyphProps>;

export const Logo: Story = {
	args: {
		d: D.rounded([
			0,25,25,25,20,20,25,25, //end of s
			15,10,25, 25, 20, 20, 25, 25, 10, 20, 10, 25,// end of h
			15,10,20,10,10,20,10,20,10, //end of a
			10,10,10,10,10,10,10,10,10,10,10,10,10,10, //end of p
			25,10,25,10,25, 25, //end of l
			5,10,10,5,5,10, 10,10,5, //end of e
			10,10,10,10,20,10,10,10,20,10

		],[
			100,75,
			0,-50,
			-50,-25,
			-50,25,
			0,50,
			100,50,
			0,50,
			-50,25,
			-50,-25,
			0,-25, //end of s
			140,-50,//tail to h
			0,-100,
			50,25,
			0,50,
			-50,25,
			0,100,
			0,-50,
			25,-12.5,
			25,12.5,
			0,50, //end of h
			40,-12.5,
			0,-25,
			25,-12.5,
			25,12.5,
			0,25,
			-25,12.5,
			-25,-12.5,
			25,12.5,
			25,-12.5,
			20,25, //end of a
			20,-25, //tail to p,
			0,-25,
			25,-12.5,
			25,12.5,
			0,25,
			-25,12.5,
			-25,-12.5,
			0,100,
			0,-100,
			25,12.5,
			25,-12.5, //end of p
			20,25,
			25,-25,
			25,-25,
			0,-75,
			-25,-25,
			-25,25,
			0,75,
			50,50, //end of l
			25,-45,
			0,-12.5,
			25,-12.5,
			25,12.5,
			0,12.5,
			-25,12.5,
			-25,-12.5,
			0,25,
			25,12.5,
			25,-12.5, //end of e
			25,0,
			0,-50,
			0,50,
			25,12.5,
			25,-12.5,
			0,-50,
			0,125,
			-25,12.5,
			-25,-12.5, //end of y
			0,-20
		])
		.setMargin(15),
		fill: 'transparent',
		stroke: "#000",
		strokeWidth: 15,
		width: "300px",
		strokeLinecap: "round"
	}
}

export const Favicon: Story = {
	args: {
		d: D.rounded([
			0,20,20,20,20,20,20,0, //hexagon
			0,20,20,20,20,5,5,5,5,20,20,20,20,20,20,5,5,5,5,20,20
		], [
			200,100,
			0,50,
			-100,50,
			-100,-50,
			0,-100,
			100,-50,
			100,50,
			0,50,
			-50,-50,
			0,-25,
			-50,-25,
			-50,25,
			0,50,
			60,70,
			0,10,
			-10,5,
			-10,-5,
			0,-30,
			-40,0,
			0,50,
			50,25,
			50,-25,
			0,-50,
			-60,-70,
			0,-10,
			10,-5,
			10,5,
			0,30,
			40,0,
			0,-25
			

		], true).setMargin(10),
		fill: '#000',
		stroke: "#000",
		strokeWidth: 10,
		width: "300px",
		strokeLinecap: "round"
	}
}


/**
 * Glyphs are simply a way to create anonymous paths within a your dom.
 */
export const Polygon: Story = {
	args: {
		d: D.polygon(6),
		width: '300px'
	}
}
