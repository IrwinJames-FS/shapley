import { Meta, StoryObj } from "@storybook/react";
import { GeometryProps } from "./types";
import Geometric from "./Geometry";
import { fromCircle, Points } from "../../geometry";
import Preview from "../Preview";
import { PolyMorphic } from "../types";
type GeoProps = PolyMorphic<GeometryProps, "div">;
export default {
	component: Geometric,
	decorators: Preview,
	tags: ['autodocs']
} as Meta<GeoProps>;

type Story = StoryObj<GeoProps>;

/**
 * I made a heart!!!
 */
export const Heart: Story = {
	args: {
		geometry: new Points([
			0.25, 0.1,
			0.5, 0.25,
			0.75, 0.1,
			1, 0.25,
			1, 0.6,
			0.5, 1,
			0, 0.6,
			0, 0.25
		])
		.round([
			0.15,
			0.01,
			0.15,
			0.15,
			0.2,
			0.01,
			0.2,
			0.15
		]),
		style:{
			backgroundColor: 'rgb(28,128,248)',
			borderColor: '#000',
			borderWidth: 0.02,
			boxShadow: "0 0 4px #000",
		},
		
		children: <h1>Heart</h1>
	}
};

export const Triangle: Story = {
	args: {
		geometry: Points.fromCircle(3, Math.PI),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderWidth: 2,
			borderColor: '#000',
			boxShadow: '0 0 4px #000'
		},
		children: <h1>Triangle</h1>
	}
};

export const Diamond: Story = {
	args: {
		geometry: Points.fromCircle(4, Math.PI),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderColor: "#000",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
		},
		children: <h1>Diamond</h1>
	}
};

export const Pentagon: Story = {
	args: {
		geometry: Points.fromCircle(5, Math.PI),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderColor: "#000",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
		},
		children: <h1>Pentagon</h1>
	}
};

export const Hexagon: Story = {
	args: {
		geometry: Points.fromCircle(6, Math.PI),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderColor: "#000",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
		},
		children: <h1>Hexagon</h1>
	}
};

export const Heptagon: Story = {
	args: {
		geometry: Points.fromCircle(7, Math.PI),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderColor: "#000",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
		},
		children: <h1>Heptagon</h1>
	}
};

export const Octagon: Story = {
	args: {
		geometry: Points.fromCircle(8, Math.PI),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderColor: "#000",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
		},
		children: <h1>Octagon</h1>
	}
};

export const Star: Story = {
	args: {
		geometry: new Points(function*(){
			const g1 = fromCircle(5, Math.PI)();
			const g2 = fromCircle(5, Math.PI + (Math.PI/5))();
			for(const p of g1) {
				yield p;
				const d = g2.next().value;
				yield d.multiplyScalar(0.4);
			}
		}),
		style: {
			backgroundColor: 'rgb(28,128,248)',
			borderColor: "#000",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
		},
		children: <h1>Star</h1>
	}
};

