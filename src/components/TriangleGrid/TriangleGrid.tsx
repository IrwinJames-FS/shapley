import { ElementType } from "react"
import { TriangleGridProps } from "./types"
import './styles.scss';
import { PolyMorphic } from "../PolyMorph/types";
import PolyGrid from "../PolyGrid/PolyGrid";
import { v4 } from "uuid";
import { clsfy } from "../../utilities";
import { PolyGridLayout } from "../PolyGrid/types";
const TriangleGrid = <T extends ElementType = "div", S extends ElementType="div">({
	as,
	className,
	children, 
	rowSize=10, 
	spacing,
	offset=1,
	horizontal
}: PolyMorphic<TriangleGridProps, T>) => {
	const el  = as || "div";
	const rot = Number(horizontal ?? false) * 30;
	
	return (<PolyGrid {...{
		as: el,
		className: clsfy(className, "triangle", horizontal ? "horizontal":undefined),
		rowSize,
		rowSizeTransformer: horizontal ? rs=>Math.ceil(rs/2):undefined,
		spacing,
		shape: {
			sides: 3,
			backgroundColor: "rgb(88, 188, 255)",
			cornerRadius: 0.1,
			borderColor: "#000",
			borderWidth: 0.02,
		},
		layout: horizontal ? 
		(i: number, size: number)=>{
			const cl = (offset+i)%size;
			const gl = cl%4;
			const rl = Math.floor(i/size)
			return {
				style: {
					gridColumnStart: Math.floor(cl/4)*2+1+[0,0,1,1][gl],
					gridRowStart: rl*2+1+[1,0,0,1][gl] 
				},
				shape: {
					rotation: [90,30,90,30][gl]
				}
			}
		}:
		(i: number, size: number)=>{
			const gc = i%size;
			const gr = Math.floor(i/size);
			return {
				style: {
					gridColumnStart: gc+1,
					gridRowStart: gr+1
				},
				shape: {
					rotation: (gr+gc+offset) % 2 * 180
				}
			}
		}
	}}>{children}</PolyGrid>);
}


export default TriangleGrid;