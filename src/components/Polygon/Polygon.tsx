import { ElementType } from "react";
import { PolyMorphic } from "../types";
import { PolygonProps } from "./types";
import Geometry from "../Geometry";
import { Points, toRad } from "../../geometry";

/**
 * Polygon uses the sides and rotation properties to generate a regular polygon as a background.
 * @returns 
 */
const Polygon = <T extends ElementType="div">({
	as,
	sides=3,
	rotation=0,
	cornerRadius=0,
	...props
}:PolyMorphic<PolygonProps, T>)=>{
	const el = as || "div";
	return (<Geometry as={el} {...{
		geometry: Points.fromCircle(sides, toRad(rotation))
		.round(cornerRadius),
		...props
	}}/>);
};

export default Polygon;