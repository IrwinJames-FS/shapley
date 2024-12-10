import { Meta, StoryObj } from "@storybook/react";
import Glyph from "./Glyph";
import D from "~/geometry/D";
import { useEffect, useMemo, useRef, useState } from "react";
import { toPrecision } from "~/geometry/utils";
import { M, Q, S, z } from "~/geometry/Commands";
export default {
	component: Glyph,
	tags: ['autodocs']
} as Meta<typeof Glyph>

type Story = StoryObj<typeof Glyph>;

export const Primary: Story = {
	args: {
		fill:"none",
		stroke: "#000",
		strokeWidth: 5,
		strokeLinejoin: "round",
		width: "300px",
		height: "300px",
		d: new D(`M 100,75 100,25 50,0 0,25 0,75 100,125 100,175 50,200 0,175 0,125
M 110,25 110,175, 110,125 150,100 190,125 190,175
M 290,175 290,135 250,115 210,135 210,175 250,195 290,175 300,190
M 310,225 310,135 350,115 390,135 390,175 350,195 310,175
M 410,25 410,175
M 430,155 470,175 510,155 510,140 470,120 430,140 430,175 470,195 510,175
M 520,120 520,175 560,195, 600,175 600,120
M 600,175 600,215 560,235`)
	}
}
export const PrimaryN: Story = {
	args:{
		d: "M 50,0 100,100 0,100z",
		fill: "rgb(28,128,248)",
		width: '300px',
		height: '300px',
	}
}

export const Secondary: Story = {
	args: {
		d: D.polygon(6, 100, [0,0], 60),
		fill: "rgb(28,128,248)",
		width: '300px',
		height: '300px'
	}
}

export const Shape: Story = {
	args: {
		d: D.shape(0, [0,0, 300,0, 275,300, 250,75, 225,250, 200,25, 175,275, 150,100, 125,225, 100,75, 75,300, 50,100, 25,225]),
		fill: "rgb(28,128,248)",
		width: '300px',
		height: '300px'
	}
}

const FPS = 1e3/32;
export const animated: Story = {
	args: {
		d:"",
		stroke: "#000",
		strokeWidth: 3,
		strokeLinejoin: "round",
		width: '300px',
		height: '300px',
		svgProps: {viewBox: "-100 -100 200 200"}
	},
	render: ({d:_, ...props})=>{
		const [sides, setSides] = useState(0)
		const dir = useRef(1);
		const d = useMemo(()=>D.polygon(sides, 100, [0,0], toPrecision(Date.now()/100, 4)%360, 0,true), [sides]);
		
		useEffect(()=>{
			let frame: number = -1;
			let lastUpdate: number = 0;
			const draw = (time:number=0) => {
				if(time-lastUpdate<FPS) return frame = requestAnimationFrame(draw);
				lastUpdate = time;
				setSides(s=>s+=0.05*dir.current);
				frame = requestAnimationFrame(draw);
			}
			frame = requestAnimationFrame(draw);
			return ()=>{
				if(~frame) cancelAnimationFrame(frame);
			}
		}, []);
		useEffect(()=>{
			if((dir.current>0 && sides >=12) || (dir.current<0 && sides <=0)) dir.current *= -1
		}, [sides]);
		return <Glyph {...{d, ...props}}/>
	}
}

