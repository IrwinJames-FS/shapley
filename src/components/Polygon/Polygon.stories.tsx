import { Meta, StoryObj } from "@storybook/react";
import { PolygonProps } from "./types";
import Polygon from "./Polygon";
import Preview from "../Preview";
import { PolyMorphic } from "../types";
import { useEffect, useRef, useState } from "react";

type Poly = PolyMorphic<PolygonProps, "div">
export default {
	component: Polygon,
	decorators: Preview,
	tags: ['autodocs']
} as Meta<Poly>;

type Story = StoryObj<Poly>;

const defaultProps: Partial<Poly> = {
	bgColor: 'rgb(28,128,248)',
	borderColor: '#000',
	borderWidth: 0.01,
	shadow: '0 0 4px #000',
	cornerRadius: 0.05
}

export const Growing: Story = {
	render: () => {
		const d = 0.005
		const [[sides, rotation], setSides] = useState([3, 0]);
		const dir = useRef(d);
		useEffect(()=>{
			let animId = -1;

			const renderShape = (time:number=0) => {
				setSides(([s])=>[s+dir.current, ((time/1e3)%360)*Math.PI/180]);
				animId = window.requestAnimationFrame(renderShape);
			}
			renderShape();
			return () => window.cancelAnimationFrame(animId);
		}, [])
		useEffect(()=>{
			if(sides >= 8) dir.current = -d;
			else if(sides <= 3) dir.current = d;
		}, [sides])
		return <Polygon sides={sides} rotation={rotation} cornerRadius={0.01} bgColor="rgb(28,128,248)" borderColor="#000" shadow="0 0 4px #000" borderWidth={0.01}>Shapely</Polygon>
	}
}
export const Triangle: Story = {
	args: {
		sides: 3,
		rotation: 180,
		children: <h1>Triangle</h1>,
		...defaultProps
	}
};

export const Diamond: Story = {
	args: {
		sides: 4,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Pentagon: Story = {
	args: {
		sides: 5,
		rotation: 180,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Hexagon: Story = {
	args: {
		sides: 6,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Heptagon: Story = {
	args: {
		sides: 7,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};

export const Octagon: Story = {
	args: {
		sides: 8,
		children: <h1>Diamond</h1>,
		...defaultProps
	}
};