import { FC } from "react";
import { GeometryRefProps } from "./types";
import { clsfy, vars } from "../../utilities";
import './style.scss';

const GeometryRef: FC<GeometryRefProps> = ({
	className,
	bgColor,
	borderColor,
	borderWidth,
	fill,
	stroke,
	strokeWidth,
	src,
	style={},
	...props
}) => (<use {...{
	className: clsfy(className, 'shapely-geometry-ref'),
	href: src,
	style: {
		...vars({
			bgColor,
			borderColor,
			borderWidth,
		}, ['', 'hover-']),
		fill,
		stroke,
		strokeWidth,
		clipPath: src ? `url(${src}-clip)`:undefined,
		...style
	},
	...props
}}/>);

export default GeometryRef;