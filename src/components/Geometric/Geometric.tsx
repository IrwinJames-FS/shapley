import { v4 } from "uuid";
import GeometryDefinition from "../GeometryDefinition";
import SVGCanvas from "../SVGCanvas";
import { FC } from "react";
import { GeometricProps } from "./types";
import { clsfy, shadowfy} from "../../utilities";
import './style.scss';
import GeometryRef from "../GeometryRef";

/**
 * Geometry renders a Set of Points into an svg drawing lines to each point with the ability to round the points.
 */
const Geometric: FC<GeometricProps> = ({
	geometry, 
	className,
	style={},
	shadow,
	src:pathId,
	objectBounding,
	clip,
	defs,
	viewBox,
	components: {
		reference,
		definition,
		clipPath
	}={},
	...svg
	})=>{
	const multiple = Array.isArray(geometry);
	const id = v4();
	const src = pathId 
	? pathId 
	: geometry 
	? '#'+id
	:undefined; //use the source if its provided other wise use an id only if a geometry for that id is provided
	return (geometry || pathId) ? (<SVGCanvas {...{
		className: clsfy(className, 'shapely-geometry'),
		viewBox: objectBounding 
		? '0 0 1 1'
		: viewBox 
		? viewBox
		: (multiple ? geometry[0]:geometry)?.viewBox 
		?? '-0.5 -0.5 1 1',
		style: {
			...shadowfy(shadow),
			...style
		},
		defs:geometry ? (<>
		{defs}
		{multiple ? geometry.map((g, i)=><GeometryDefinition key={i} {...{geometry:g, id:id+'-'+i, clip, components:{clipPath}, objectBounding, ...definition}}/>):<GeometryDefinition {...{geometry, id, clip, components:{clipPath}, objectBounding, ...definition}}/>}
		</>):defs,
		...svg
	}}>
		{multiple ? geometry.map((_, i)=><GeometryRef key={i} {...{
			src:src+'-'+i,
			clip,
			...reference,
		}}/>): <GeometryRef {...{
			src,
			clip,
			...reference
		}}/>}
	</SVGCanvas>):undefined;
}

export default Geometric