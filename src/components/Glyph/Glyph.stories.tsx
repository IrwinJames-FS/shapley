import { Meta, StoryObj } from "@storybook/react";
import Glyph from "./Glyph";
import D from "~/geometry/D";
import { useEffect, useMemo, useRef, useState } from "react";
import { toPrecision } from "~/geometry/utils";
import './Glyph.stories.css';
export default {
	component: Glyph,
	tags: ['autodocs']
} as Meta<typeof Glyph>

type Story = StoryObj<typeof Glyph>;


export const Primary: Story = {
	args: {
		fill:"none",
		stroke: "#000",
		strokeWidth: 10,
		strokeLinecap: 'round',
		width: "600px",
		height: "300px",
		className:"stroked",
		d: D.rounded(0, 
			[
				100,75, 0,-50, -50,-25, -50,25, 0,50, 100,50, 0,50, -50,25, -50,-25, 0,-50,
				120,-20, 40,-20, 0,-40, -40,-20, 0,150, 0,-50, 40,-20, 40,20, 0,50,
				20,0, 0,-40, 40,-20, 40,20, 0,40, -40,20, -40,-20, 0,-40, 40,-20, 40,20, 0,60,
				20,0, 0,-80, 0,20, 40,-20, 40,20, 0,40, -40,20,-40,-20, 0,60, 0,-60, 40,20, 50,0, 20,-120, -10,-20, -10,20, 20,120,
				20,-40, 40,20, 40,-20, 0,-20, -40,-20, -40,20, 0,40, 40,20, 40,-20,
				20,-40, 0,40, 40,20, 40,-20, 0,-40, 0,80, -40,20
			]
		).flatten(),
	},
	render: ({d:_, ...args})=>{
		const [radius, setRadius] = useState(0);
		const dir = useRef(1);
		const d = useMemo(()=>D.rounded(radius, 
			[
				100,75, 0,-50, -50,-25, -50,25, 0,50, 100,50, 0,50, -50,25, -50,-25, 0,-50,
				120,-20, 40,-20, 0,-40, -40,-20, 0,150, 0,-50, 40,-20, 40,20, 0,50,
				20,0, 0,-40, 40,-20, 40,20, 0,40, -40,20, -40,-20, 0,-40, 40,-20, 40,20, 0,60,
				20,0, 0,-80, 0,20, 40,-20, 40,20, 0,40, -40,20,-40,-20, 0,60, 0,-60, 40,20, 50,0, 20,-120, -10,-20, -10,20, 20,120,
				20,-40, 40,20, 40,-20, 0,-20, -40,-20, -40,20, 0,40, 40,20, 40,-20,
				20,-40, 0,40, 40,20, 40,-20, 0,-40, 0,80, -40,20
			]
		).setMargin(10).flatten(), [radius]);
	
		/*useEffect(()=>{
			let frame: number = -1;
			let lastUpdate: number = 0;
			const draw = (time:number=0) => {
				if(time-lastUpdate<5e3) return frame = requestAnimationFrame(draw);
				lastUpdate = time;
				setRadius(s=>s+=10*dir.current);
				frame = requestAnimationFrame(draw);
			}
			frame = requestAnimationFrame(draw);
			return ()=>{
				if(~frame) cancelAnimationFrame(frame);
			}
		}, []);*/
		useEffect(()=>{
			if((dir.current>0 && radius >=10) || (dir.current<0 && radius <=0)) dir.current *= -1
		}, [radius]);
		return <Glyph {...{
			d, ...args,
			onAnimationIteration: ()=>setRadius(s=>s+=10*dir.current)
		}}/>
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
		strokeWidth: 1,
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
			if((dir.current>0 && sides >=18) || (dir.current<0 && sides <=0)) dir.current *= -1
		}, [sides]);
		return <Glyph {...{d, ...props}}/>
	}
}

export const normalized:Story = {
	args:{
		d: D.polygon(4, 100, [200,200], 0, 10).toObjectBounding(),
		fill: 'rgb(28,128,248)',
		width: '300px',
		height: '300px'
	}
}