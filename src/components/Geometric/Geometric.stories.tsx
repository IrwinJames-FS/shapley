import { Meta, StoryObj } from "@storybook/react";
import { GeometricProps } from "./types";
import Geometric from "./Geometric";
import Preview from "../Preview";
import { fromCircle, Points } from "../../geometry";

export default {
	component: Geometric,
	decorators: Preview,
	tags: ['autodocs']
} as Meta<GeometricProps>;

type Story = StoryObj<GeometricProps>;

export const Triangle: Story = {
	args:{
		geometry: Points
		.fromCircle(3, Math.PI)
		.round(0.1),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
}

export const Diamond: Story = {
	args:{
		geometry: Points
		.fromCircle(4, Math.PI)
		.round(0.1),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
};

export const Pentagon: Story = {
	args:{
		geometry: Points
		.fromCircle(5, Math.PI)
		.round(0.1),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
};

export const Hexagon: Story = {
	args:{
		geometry: Points
		.fromCircle(6, Math.PI)
		.round(0.1),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
};

export const Heptagon: Story = {
	args:{
		geometry: Points
		.fromCircle(7, Math.PI)
		.round(0.1),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
};

export const Octagon: Story = {
	args:{
		geometry: Points
		.fromCircle(3, Math.PI)
		.round(0.1),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
}

/**
 * The star is a good example of combining two iterators to create a more complex polygon
 */
export const Star: Story = {
	args:{
		geometry: new Points(function*(){
			const g1 = fromCircle(5, Math.PI)();
			const g2 = fromCircle(5, Math.PI + (Math.PI/5))();
			for(const p of g1) {
				
				yield p;
				const d = g2.next().value;
				yield d.multiplyScalar(0.4);
			}
		}),
		bgColor: "rgb(28,128,248)",
		borderColor: "#000",
		shadow: "0 0 4px #000"
	}
}