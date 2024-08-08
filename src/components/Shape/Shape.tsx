import { FC } from "react";
import { ShapeProps } from "./types";
import './style.scss';
import ngon from "../../geometry/ngon";
const Shape: FC<ShapeProps> = () => {
	const [,d] = ngon(3);
	return (<svg {...{
		viewBox: '-1 -1 2 2',
		width: 100,
		height: 100
	}}>
		<path {...{d, fill:'#F00'}}/>
	</svg>);
};

export default Shape;