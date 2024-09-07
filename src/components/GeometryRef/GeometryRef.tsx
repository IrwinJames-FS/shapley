import { FC } from "react";
import { GeometryRefProps } from "./types";
import { clsfy} from "../../utilities";
import './style.scss';

const GeometryRef: FC<GeometryRefProps> = ({
	className,
	src,
	clipped,
	style={},
	...props
}) => (<use {...{
	className: clsfy(className, 'shapely-geometry-ref'),
	href: src,
	style: {
		clipPath: (clipped && src) ? `url(${src}-clip)`:undefined,
		...style
	},
	...props
}}/>);

export default GeometryRef;