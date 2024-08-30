import { ElementType } from "react";
import { PolyMorphic } from "../types";
import { GeometryProps } from "./types";
import Geometric from "../Geometric";
import { clsfy, vars } from "../../utilities";
import './style.scss';

/**
 * Geometric is a react component that uses a Points class to render a shape.
 * @param param0 
 * @returns 
 */
const Geometry = <T extends ElementType="div">({
	as,
	aspectRatio:ar,
	viewBox:vb,
	className,
	geometry,
	children,
	bgColor,
	borderColor,
	borderWidth,
	shadow,
	pathId,
	style={},
	svg:{
		className: geometryClassName ="",
		...shapeProps
	}={},
	...props
}: PolyMorphic<GeometryProps, T>) => {
	const El = as || "div";
	let aspectRatio = ar 
	let viewBox = vb
	if(!ar || !vb && geometry) {
		if(Array.isArray(geometry)){
			aspectRatio = ar ?? geometry[0].aspectRatio;
			viewBox = vb ?? geometry[0].viewBox; 
		}
	}
	return (<El {...{
		className:clsfy(className, 'shapely-geometric'),
		style: {
			...vars({
				aspectRatio
			}),
			...style
		},
		...props
	}}>
		
		<Geometric {...{
			geometry, 
			
			bgColor,
			borderColor,
			borderWidth,
			shadow,
			pathId,
			className: clsfy(geometryClassName, 'shapely-geometric-bg'),
			viewBox,
			...shapeProps
		}}/>
		{children}
	</El>);
};

export default Geometry;