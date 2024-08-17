import { v4 } from "uuid";
import GeometryDefinition from "../GeometryDefinition/GeometryDefinition";
import SVGCanvas from "../SVGCanvas";
import { FC } from "react";
import { GeometricProps } from "./types";
import { clsfy, shadowfy, vars } from "../../utilities";
import './style.scss';
import GeometryRef from "../GeometryRef";

/**
 * Geometry renders a Set of Points into an svg drawing lines to each point with the ability to round the points.
 */
const Geometric: FC<GeometricProps> = ({
	geometry, 
	className,
	defs,
	src,
	style={},
	bgColor,
	borderColor,
	borderWidth,
	shadow,
	viewBox,
	...props})=>{
	const id = v4();
	return (<SVGCanvas {...{
		className: clsfy(className, 'shapely-geometry'),
		viewBox: viewBox ?? geometry?.viewBox ?? '-0.5 -0.5 1 1',
		style: {
			...vars({
				shadow: shadowfy(shadow)
			}),
			...style
		},
		defs:geometry ? (<>
		{defs}
		<GeometryDefinition {...{geometry, id}}/>
		</>):undefined,
		...props
	}}>
		<GeometryRef {...{
			src: src ?? '#'+id,
			bgColor,
			borderColor,
			borderWidth
		}}/>
	</SVGCanvas>);
}

export default Geometric