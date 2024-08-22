import { Meta, StoryObj } from "@storybook/react";
import './style.stories.scss';
import { useEffect, useMemo, useState } from "react";
import SVGCache from "./SVGCache";
import Geometric from "../Geometric";
import Preview from "../Preview";
import { Points } from "../../geometry";
import GeometryDefinition from "../GeometryDefinition";

type CachePreviewProps = {
	count: number,
	speeds: Rotations
}
const ids = ["triangle-shape", "diamond-shape", "pentagon-shape", "hexagon-shape", "heptagon-shape", "octagon-shape"];
type Rotations = [number, number, number, number, number, number];
export default {
	decorators: Preview,
	tags: ['autodocs'],
	render: ({count, speeds}) => {
		const [rotations, setRotations] = useState<Rotations>([0,0,0,0,0,0]);
		
		const geometries = useMemo<Points[]>(()=>rotations.map((r,i)=>Points.fromCircle(i+3, Math.PI+r)), [rotations]);
		
		const colors = useMemo(()=>["#FF0", "#F0F", "#0FF", "#F00", "#0F0", "#00F"], []);
		const infos = useMemo(()=>geometries.map(g=>g.viewInfo), [geometries]);
		const positions = useMemo(()=>new Array(count * 6).fill({top:'', left: '', width:''}).map(()=>({top:Math.floor(Math.random()*100)+'%', left:Math.floor(Math.random()*100)+'%', width:Math.floor(Math.random()*10)+'rem'})), []);
		const shapes = useMemo(()=>{
			const arr = [];
			for(let i = 0; i<count; i++){
				for(let j = 0; j<6; j++){
					arr.push(<Geometric {...{
						src: '#'+ids[j],
						viewBox: infos[j][1],
						
						bgColor: colors[j],
						borderColor: "#000",
						borderWidth: 0.01,
						shadow: "0 0 4px #000",
						style: {
							aspectRatio:infos[j][0],
							...positions[i*6+j]
						}
					}}/>)
				}
			}
			return arr;
		}, [count, infos]);
		useEffect(()=>{
			let id:number = -1;
			const draw = ()=>{
				console.log("drawing");
				setRotations(rots=>rots.map((r,i)=>r+speeds[i]*0.01) as Rotations)
				id = requestAnimationFrame(draw);
			}
			draw();
			return () => cancelAnimationFrame(id);
		}, [setRotations, speeds]);
		return (<div className="shapely-cache-example">
			<SVGCache>
				{geometries.map((p,i)=> (<GeometryDefinition key={"def-"+i} {...{
					id: ids[i],
					geometry: p
				}}/>))}
			</SVGCache>
			{...shapes}
		</div>);
	}
} as Meta<CachePreviewProps>;

type Story = StoryObj<CachePreviewProps>;

/**
 * The following example is to illustrate how an SVG cache can be used to render multiple components all pulling from common geometries. 
 */
export const Shapes:Story = {
	args: {
		count: 10,
		speeds: new Array(6).fill(1).map(()=>Math.random()) as Rotations
	}
}