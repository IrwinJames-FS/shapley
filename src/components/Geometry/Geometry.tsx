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
	pathId,
	style:{backgroundColor:fill=undefined, borderColor:stroke=undefined, borderWidth:strokeWidth=undefined, boxShadow:shadow=undefined, ...style}={},

	pstyle={},
	components: {
		svg:{
			className: geometryClassName ="",
			...shapeProps
		}={},
		...components
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
		} else {
			aspectRatio = ar ?? geometry?.aspectRatio;
			viewBox = vb ?? geometry?.viewBox;
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
			src:pathId,
			fill,
			stroke,
			strokeWidth,
			shadow,
			className: clsfy(geometryClassName, 'shapely-geometric-bg'),
			viewBox,
			components,
			...pstyle,
			...shapeProps
		}}/>
		{children}
	</El>);
};

export default Geometry;