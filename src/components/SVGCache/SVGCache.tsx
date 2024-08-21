import { FC } from "react";
import { SVGCacheProps } from "./types";
import { clsfy } from "../../utilities";
import './style.scss';

/**
 * SVGCache acts as a non visible component to store path definitions which can be refered to throughout the project.
 * 
 * All path commands of these definitions are linked so if you wanted to animate a triangle turning to a diamond on hover you should use a Geometry component with a custom Geometry.
 */
const SVGCache:FC<SVGCacheProps> = ({children, className, ...props}) => (<svg {...{
	className: clsfy(className, 'shapely-cache'),
	
	...props
}}>
	<defs>
		{children}
	</defs>
</svg>);

export default SVGCache;