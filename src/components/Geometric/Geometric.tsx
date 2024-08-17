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
	style={},
	bgColor,
	borderColor,
	borderWidth,
	shadow,
	...props})=>{
	const id = v4();
	return (<SVGCanvas {...{
		className: clsfy(className, 'shapely-geometry'),
		viewBox: geometry.viewBox,
		style: {
			...vars({
				shadow: shadowfy(shadow)
			}),
			...style
		},
		defs:<>
		{defs}
		<GeometryDefinition {...{geometry, id}}/>
		</>,
		...props
	}}>
		<GeometryRef {...{
			src: '#'+id,
			bgColor,
			borderColor,
			borderWidth
		}}/>
	</SVGCanvas>);
}

export default Geometric