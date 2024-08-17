import { FC } from "react";
import { SVGCanvasProps } from "./types";
import { clsfy } from "../../utilities";
import './style.scss';
/**
 * The SVG canvas is basically just an SVG element. 
 * 
 * I will use this to set defaults if I need to.
 * 
 * Also I am separating the defs and children in the even paths are being loaded from a resource. 
 * @param props
 * @returns 
 */
const SVGCanvas: FC<SVGCanvasProps> = ({className, defs, children, ...props}) => (<svg {...{
	className: clsfy(className, 'shapely-svg-canvas'),
	...props
}}>
	<defs>{defs}</defs>
	{children}
</svg>);

export default SVGCanvas;