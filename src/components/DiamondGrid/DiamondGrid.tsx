import { ElementType } from "react";
import { PolyMorphic } from "../PolyMorph/types";
import { DiamondGridProps } from "./types";
import PolyGrid from "../PolyGrid/PolyGrid";
import { clsfy } from "../../utilities";

import './style.scss';
const DiamondGrid = <T extends ElementType = "div">({
	as:el,
	className,
	children,
	rowSize=10,
	spacing,
	offset=0
}:PolyMorphic<DiamondGridProps, T>) => (<PolyGrid {...{
	className: clsfy(className, "diamond"),
	as: el || "div", 
	rowSize,
	spacing, 
	shape: {
		sides: 4,
		backgroundColor: "rgb(68,168,255)",
		borderColor: "#000",
		borderWidth: 0.02,
		cornerRadius: 0.1
	},
	layout: (i, rs)=>{
		const gc = i%rs;
		const gr = Math.floor(i/rs)
		return {
			style: {
				gridColumnStart: gc+1,
				gridRowStart: (gr*2)+1 + (gc+offset)%2
			}
		}
	}
}}>{children}</PolyGrid>)

export default DiamondGrid;