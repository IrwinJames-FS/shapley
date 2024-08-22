import { v4 } from "uuid";
import GeometryDefinition from "../GeometryDefinition";
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
	viewBox,
	pathId,
	objectBounding,
	noclip,
	...props})=>{
	const multiple = Array.isArray(geometry);
	const id = v4();
	const src = pathId 
	? pathId 
	: geometry 
	? '#'+id
	:undefined; //use the source if its provided other wise use an id only if a geometry for that id is provided
	return (<SVGCanvas {...{
		className: clsfy(className, 'shapely-geometry'),
		viewBox: objectBounding 
		? '0 0 1 1'
		: viewBox 
		? viewBox
		: (multiple ? geometry[0]:geometry)?.viewBox 
		?? '-0.5 -0.5 1 1',
		style: {
			...vars({
				shadow: shadowfy(shadow)
			}),
			...style
		},
		defs:geometry ? (<>
		{defs}
		{multiple ? geometry.map((g, i)=><GeometryDefinition key={i} {...{geometry:g, id:id+'-'+i, noclip}}/>):<GeometryDefinition {...{geometry, id, noclip}}/>}
		
		</>):undefined,
		...props
	}}>
		{multiple ? geometry.map((_, i)=><GeometryRef {...{
			src:src+'-'+i,
			bgColor,
			borderColor,
			borderWidth,
		}}/>):<GeometryRef {...{
			src,
			bgColor,
			borderColor,
			borderWidth,
		}}/>}
	</SVGCanvas>);
}

export default Geometric