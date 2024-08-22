import { FC } from "react";
import { GeometryRefProps } from "./types";
import { clsfy, vars } from "../../utilities";
import './style.scss';

const GeometryRef: FC<GeometryRefProps> = ({
	className,
	bgColor,
	borderColor,
	borderWidth,
	src,
	style={},
	...props
}) => (<use {...{
	className: clsfy(className, 'shapely-geometry-ref'),
	xlinkHref: src,
	style: {
		...vars({
			clipPath: src ? `url(${src}-clip)`:undefined,
			bgColor,
			borderColor,
			borderWidth,
		}, ['', 'hover-']),
		...style
	},
	...props
}}/>);

export default GeometryRef;