import { Meta, StoryObj } from "@storybook/react";
import { SVGCanvasProps } from "./types";
import SVGCanvas from "./SVGCanvas";
import Preview from "../Preview";
import PolygonDefinition from "../PolygonDefinition";
import GeometryRef from "../GeometryRef";
import { vars } from "../../utilities";
import { Points } from "../../geometry";
import GeometryDefinition from "../GeometryDefinition";

export default {
	component: SVGCanvas,
	tags: ['autodocs'],
	decorators: Preview
} as Meta<SVGCanvasProps>;

type Story = StoryObj<SVGCanvasProps>

export const SVGCanvasExample: Story = {
	args: {

		style: {
			aspectRatio: Points.fromCircle(6, Math.PI/30).aspectRatio,
			width: '100%',
			...vars({shadow:"0 0 4px #000"})
		},
		viewBox: '0 0 1 1',
		defs: <PolygonDefinition id="hexagon" sides={6} rotation={30} objectBounding/>,
		children: <GeometryRef src="#hexagon" bgColor="rgb(28,128,248)" borderColor="#000" borderWidth={0.1} />
	}
};

export const SmallLogoExample: Story = {
	render: () => {
		return <SVGCanvas {...{
			viewBox: '0 0 1 1',
			style: {
				aspectRatio: Points.fromCircle(6).aspectRatio,
				width: '100%',
				...vars({shadow: "0 0 4px #000"})
			},
			defs: <>
				<PolygonDefinition {...{
					id: 'small-logo-bg',
					sides: 6,
					cornerRadius: 0.03
				}} objectBounding/>
				<GeometryDefinition {...{
					id: 'small-logo-signet',
					geometry: new Points([ //S
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
					.normalize()
					.round([
						0,
						...new Array(4).fill(0.1),
						...new Array(4).fill(0.05),
						0.1,0,
						...new Array(4).fill(0.1),
						...new Array(4).fill(0.05), 0.1])
					.scaleByScalar(0.6)
					
					
				}}/>
			</>,
			children: <>
				<GeometryRef {...{
					src: '#small-logo-bg',
					fill: 'rgb(28,128,248)',
					stroke: '#000',
					strokeWidth: 0.1,
				}}/>
				<GeometryRef {...{
					x:0.2,
					y: 0.2,
					src: '#small-logo-signet',
					fill: '#000'
				}}/>
			</>
		}}/>
	}
}

