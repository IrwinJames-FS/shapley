import { FC } from "react";
import { SVGCanvasProps } from "./types";
import { clsfy } from "../../utilities";

import './style.scss';
/**
 * The SVGCanvas is an SVG element that does not preserveAspectRatio. 
 * 
 * The reason for this being it expects its content to preserve the aspect ratio. this allows for a cleaner implementation of objectBoundingUnits.  
 */
const SVGCanvas: FC<SVGCanvasProps> = ({className, defs, children, ...props}) => (<svg {...{
	className: clsfy(className, 'shapely-svg-canvas'),
	preserveAspectRatio: "none",
	...props
}}>
	{defs && <defs>{defs}</defs>}
	{children}
</svg>);

export default SVGCanvas;