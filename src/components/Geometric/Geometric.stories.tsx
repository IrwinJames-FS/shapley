import { Meta, StoryObj } from "@storybook/react";
import { GeometricProps } from "./types";
import Geometric from "./Geometric";
import Preview from "../Preview";
import { fromCircle, Points } from "../../geometry";
import { CSSPropertiesPlusVars } from "../types";
import './Geometric.stories.scss';

export default {
	title: "Components/Geometric",
	component: Geometric,
	decorators: Preview,
	tags: ['autodocs']
} as Meta<GeometricProps>;

type Story = StoryObj<GeometricProps>;


/** 
 * This is an attempt to create a repeating lattice pattern using triangles. Or rather creating a minimal sized image that can be repeated.
*/
export const TriangleLattice: Story = {
	args: {
		geometry: new Points([
			0.5, 1,
			1,1,
			0.5, 0,
			0, 1,
			0.5, 1,
			1, 1,
			0.5, 2,
			0,1
		], true),
		bgColor: 'transparent',
		borderColor: '#000',
		borderWidth: 0.1,
		noclip: true,
		style: {
			'--aspect-ratio': `1/2`,
			flexGrow: 0,
			width: '400px',
			backgroundColor: 'rgb(28,128,248)'
		} as CSSPropertiesPlusVars,
	}
}
/**
 * Using the lattice generated in the previous story heres the repeating resul
 */
export const TriLatticeResult: Story = {
	render: ()=>{
		return (<div id="tri-lattice"></div>)
	}
}
const [mx, my] = [-0.433012716284439, -0.75];
const [Mx, My] = [0.433012716284439, 0.75];
const [w, h] = [0.866025432568878, 1.5];
export const HexagonLattice: Story = {
	args: {
		geometry: new Points([
			0, my,
			0, my+0.25,
			mx,my+0.5,
			mx,my+1,
			0, my+1.25,
			0, My,
			0, my+1.25,
			Mx,my+1,
			Mx,my+0.5,
			0, my+0.25			
		], true),
		bgColor: 'transparent',
		borderColor: '#000',
		borderWidth: 0.1,
		noclip: true,
		viewBox: `${mx} ${my} ${w} ${h}`,
		style: {
			'--aspect-ratio': `${w}/${h}`,
			flexGrow: 0,
			width: '400px',
			backgroundColor: 'rgb(28,128,248)'
		} as CSSPropertiesPlusVars,
	}
	
}

export const HexLatticeResult: Story = {
	render: ()=>{
		return (<div id="hex-lattice"></div>)
	}
}


export const Logo: Story = {
	args: {
		geometry: [
			new Points([ //S
				1, 0.75,
				1, 0.25,
				0.5, 0,
				0, 0.25,
				0, 0.75,
				0.8, 1.35,
				0.8, 1.65,
				0.5, 1.8,
				0.2, 1.65,
				0.2, 1.25,
				0, 1.25,
				0, 1.75,
				0.5, 2,
				1, 1.75,
				1, 1.25,
				0.2, 0.65,
				0.2, 0.35,
				0.5, 0.2,
				0.8, 0.35,
				0.8, 0.75,
			])
			.round([
				0,
				...new Array(4).fill(0.1),
				...new Array(4).fill(0.05),
				0.1,0,
				...new Array(4).fill(0.1),
				...new Array(4).fill(0.05), 0.1]),
			new Points([ //ha
				1.05, 1.25,
				1, 1.3,
				1, 1.2,
				1.35, 0.85,
				1.25, 0.75,
				1.15, 0.85,
				1.15, 1.04,
				1.05, 1.14,
				1.05, 0.85,
				1.25, 0.65,
				1.45, 0.85,
				1.15, 1.15,
				1.15, 1.35,
				1.35, 1.15,
				1.65, 1.45,
				1.65, 1.67, //time to convert to a
				1.7, 1.6,
				1.7, 1.35,
				2, 1.2,
				2.3, 1.35,
				2.3, 1.55, //leg to p
				2.35, 1.55,
				2.35, 1.35,
				2.65, 1.2,
				2.95, 1.35,
				3, 1.35, //leg to e
				3, 1.25,
				3.3, 1.1,
				3.6, 1.25,
				3.6, 1.45,
				3.3, 1.6,
				3.11, 1.49,
				3.11, 1.4,
				3.3, 1.5,
				3.5, 1.4,
				3.5, 1.3,
				3.3, 1.2,
				3.1, 1.3,
				3.1, 1.35,
				3.1, 1.6,
				3.3, 1.7,
				3.75, 1.475, //leg to l
				4.25, 1.225,
				4.25, 1.025,
				4.05, 0.925,
				3.85, 1.025,
				3.85, 1.42,
				3.75, 1.47,
				3.75, 0.975,
				4.05, 0.825,
				4.35, 0.975,
				4.35, 1.275,
				3.85, 1.525,
				3.85, 1.6,
				4.05, 1.7,
				4.35, 1.575, //leg to y
				4.55, 1.5,
				4.65, 1.4,
				4.55, 1.3,
				4.45, 1.4,
				4.45, 1.53,
				4.35, 1.565,
				4.35, 1.4,
				4.55, 1.2,
				4.75, 1.4,
				4.65, 1.55,
				4.45, 1.625,
				4.65, 1.725,
				4.85, 1.625,
				4.85, 1.225,
				4.95, 1.225,
				4.95, 1.675,
				4.95, 1.8,
				4.65, 2,
				4.35, 1.85,
				4.35, 1.75,
				4.65, 1.9,
				4.85, 1.775,
				4.85, 1.725,
				4.65, 1.825,
				4.35, 1.675,
				4.05, 1.8,
				3.75, 1.65,
				3.75, 1.575,

				3.3, 1.8, 
				3, 1.65, //end of e
				3, 1.45,
				2.95, 1.45, //end of p
				
				2.95, 1.65,
				2.65, 1.8,
				2.65, 1.7,
				2.85, 1.6,
				2.85, 1.4,
				2.65, 1.3,
				2.45, 1.4, 
				2.45, 1.55,
				2.45, 2,
				2.35, 2,
				2.35, 1.65,
				2.3, 1.65, //end of a 
				2, 1.8,
				1.755, 1.665,
				1.805, 1.605,
				2, 1.7,
				2.2, 1.6,
				2.2, 1.4,
				2, 1.3,
				1.8, 1.4,
				1.8, 1.6,

				1.65, 1.8,//end of h
				1.55, 1.8, 
				1.55, 1.5,
				1.35, 1.3,
				1.15, 1.5,
				1.15, 1.8,
				1.05, 1.8,
			])
			.round([0, 0.05, 0.05, 0.1, 0.1, 0.1, 0, 0, 0.1, 0.2,0.15, 0.0, 0.05, 0.25, 0.1, 0.05, 0.05, 0.1, 0.1, 0.1, 0.05, 0.05, 0.1, 0.1, 0.05, 0.05, 0.1, 0.1, 0.1, 0.1, 0.1, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0.05, 0.05, 0, 0.05, 0.05, 0.05, 0.05, 0, 0, 0.1, 0.1, 0.1, 0.1, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0.1, 0.1, 0.1, 0.1, 0, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0, 0.1, 0.1, 0, 0.1, 0.1, 0.05, 0.05, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.05, 0, 0.0, 0.05, 0.05, 0.05,0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1, 0.1, 0.05, 0.05]),
		],
		viewBox: '0 0 6 2',
		style: {
			'--aspect-ratio': '1/2',
			flexGrow: 0,
			width: '400px',
			height: '200px',
		} as CSSPropertiesPlusVars,
		bgColor: '#000',
	}
}
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