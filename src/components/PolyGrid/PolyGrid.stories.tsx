import { Meta, StoryObj } from "@storybook/react";
import PolyGrid from "./PolyGrid";
import { PolyGridProps } from "./types";
import { vars } from "../../utilities";
import { v4 } from "uuid";

type GridProps = PolyGridProps<"div"> & {testChildren: number};

/**
 * testChildren is not a property of the component.
 */
export default {
	component: PolyGrid,
	render: ({
		testChildren, 
		...args
	}) => {
		
		return <PolyGrid {...args}>
			{new Array(testChildren).fill('').map((_,i)=><p key={i}>{i}</p>)}
		</PolyGrid>
	}
} as Meta<GridProps>;



type Story = StoryObj<GridProps>;

/**
 * This is an example of a Triangle Layout using the Poly Grid
 */
export const PolyGridTriangleTest: Story = {
	args: {
		testChildren: 10,
		spacing: "5px 10px",
		rowSize: 10,
		gridCellSize: [2, undefined],
		gridRowSuffix: '1fr',
		shape: {
			sides: 3,
			backgroundColor: "#F00",
			shadow: "0 0 5px #000",
			borderColor: '#000',
			borderWidth: 0.01
		},
		layout: (i, rowSize) =>{
			const gridColumnStart = (i%rowSize)+1;
			const gridRowStart = Math.floor(i/rowSize)+1;
			const shapeId = v4();
			return {
				style: {
					gridColumnStart,
					gridRowStart,
					...vars({
						clipPath: `url(#${shapeId})`
					})
				},
				shape: {
					shapeId,
					rotation: (gridColumnStart+gridRowStart)%2 ? 0:180
				}
				
			}
		},
	}
}

/**
 * This is an example of a Diamond Layout using the Poly Grid
 */
export const PolyGridDiamondTest: Story = {
	args: {
		testChildren: 100,
		spacing: "5px 10px",
		rowSize: 19,
		gridCellSize: [2, 2],
		gridRowSuffix: '1fr',
		shape: {
			sides: 4,
			backgroundColor: "#F00",
			shadow: "0 0 5px #000",
			borderColor: '#000',
			borderWidth: 0.01
		},
		layout: (i, rowSize)=>{
			const gridColumnStart = (i%rowSize)+1;
			const gridRowStart = Math.floor(i/rowSize)* 2 + 1 + (gridColumnStart%2);
			const shapeId = v4();
			return {
				style: {
					gridColumnStart,
					gridRowStart,
					...vars({
						clipPath: `url(#${shapeId})`
					})
				},
				shape: {
					shapeId,
				}
			};
		}
	}
}

/**
 * This is an example of a Vertical Hexagon Layout using a Poly Grid
 */
export const PolyGridHexagonTest: Story = {
	args: {
		testChildren: 100,
		spacing: "5px",
		rowSize: 19,
		rowSizeTransformer: r=>Math.ceil(r/2),
		gridCellSize: [2, 3],
		gridRowSuffix: '1fr',
		gridCellTemplate: '1fr 1fr',
		gridRowTemplate: '1fr 2fr',
		shape: {
			sides: 6,
			backgroundColor: "#F00",
			shadow: "0 0 5px #000",
			borderColor: '#000',
			borderWidth: 0.01
		},
		layout: (i, rowSize)=>{
			const cl = i%rowSize;
			const gridColumnStart = cl+1;
			const gc = (cl+1)%2;
			const gridRowStart = Math.floor(i/rowSize) * 4 + 1 + gc * 2
			const shapeId = v4();
			return {
				style: {
					gridColumnStart,
					gridRowStart,
					...vars({
						clipPath: `url(#${shapeId})`
					})
				},
				shape: {
					shapeId
				}
			};
		}
	}
}

/**
 * This is an example of a Horizontal Hexagon Grid using the Poly Grid
 */
export const PolyGridHexagonHorizontalTest: Story = {
	args: {
		testChildren: 100,
		spacing: "5px 10px",
		rowSize: 19,
		gridCellSize: [3, 2],
		gridRowSuffix: '1fr',
		gridCellTemplate: '1fr 2fr',
		shape: {
			sides: 6,
			rotation: 30,
			backgroundColor: "#F00",
			shadow: "0 0 5px #000",
			borderColor: '#000',
			borderWidth: 0.01
		},
		layout: (i, rowSize)=>{
			const cl = i%rowSize;
			const gridColumnStart = cl*2+1;
			const gc = (cl+1)%2;
			const gridRowStart = Math.floor(i/rowSize) * 2 + 1 + gc;
			const shapeId = v4();
			return {
				style: {
					gridColumnStart,
					gridRowStart,
					...vars({
						clipPath: `url(#${shapeId})`
					})
				},
				shape: {
					shapeId
				}
			};
		}
	}
}

