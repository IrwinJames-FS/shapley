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
	className,
	geometry,
	children,
	bgColor,
	borderColor,
	borderWidth,
	shadow,
	style={},
	svg:{
		className: geometryClassName ="",
		...shapeProps
	}={},
	...props
}: PolyMorphic<GeometryProps, T>) => {
	const El = as || "div";
	return (<El {...{
		className:clsfy(className, 'shapely-geometric'),
		style: {
			...vars({
				aspectRatio: geometry.aspectRatio
			}),
			...style
		},
		...props
	}}>
		<Geometric {...{
			geometry, 
			className: clsfy(geometryClassName, 'shapely-geometric-bg'),
			bgColor,
			borderColor,
			borderWidth,
			shadow,
			...shapeProps
		}}/>
		{children}
	</El>);
};

export default Geometry;