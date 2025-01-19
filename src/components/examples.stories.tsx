/*
This file will be used to handle examples. arguments wont be passed this will be more a reference for recipes and examples to show functional examples.
*/
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { D } from "../geometry/D";
import { Glyph } from "./Glyph/Glyph";
import { MAX } from "uuid";


export default {
	title: "components/examples",
	tags: ['autodocs']
} as Meta

type Story = StoryObj

export const AnimatedPolygonGlyph: Story = {
	render(){
		const MAX_SIDES = 12;
		const MIN_SIDES = 0;
		const STEP = 0.02;
		const FPS = 1e3/32;
		const [sides, setSides] = useState(0);
		const lastUpdate = useRef(0);
		const dir = useRef(-1);
		const d = useMemo(()=>D.polygon(sides, {radius: 50, connectAll:true, rotation: lastUpdate.current*0.01}), [sides]);


		useEffect(()=>{
			let frame = -1;
			const draw = (time: number)=>{
				if(time-lastUpdate.current < FPS) return frame = requestAnimationFrame(draw); //skip this frame
				console.log(time-lastUpdate.current, FPS)
				lastUpdate.current = time;
				setSides(s=>Math.min(MAX_SIDES, Math.max(MIN_SIDES, s+(dir.current*STEP))));
				return frame = requestAnimationFrame(draw);
			}
			frame = requestAnimationFrame(draw);
			return ()=>{
				if(!~frame) cancelAnimationFrame(frame)
			}
		}, [])
		useEffect(()=>{
			if(sides === MAX_SIDES || sides === MIN_SIDES) dir.current *= -1;
		}, [sides])
		return <Glyph width="300px" d={d} stroke="#000" strokeWidth={2} fill="transparent" strokeLinejoin="round" strokeLinecap="round" viewBox="-60 -60 120 120"/>
	}
}