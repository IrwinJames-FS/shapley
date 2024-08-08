import { FC, useMemo } from "react";
import { ShapeProps } from "./types";
import './style.scss';
import ngon from "../../geometry/ngon";

/**
 * The shape component is currently purely a client side component.
 * @param param0 
 * @returns 
 */
const Shape: FC<ShapeProps> = ({sides=3, rotation=0, cornerRadius=0}) => {
	const [aspectRatio,viewBox, d] = useMemo(()=>ngon(sides, rotation * Math.PI / 180, cornerRadius), [sides, rotation, cornerRadius]);
	return (<div {...{
		className: "shapely-shape",
		style: {
			aspectRatio, 
		}
	}}>
		<svg {...{
		viewBox,
		preserveAspectRatio: 'none'
	}}>
		<path {...{d, fill:'#F00'}}/>
	</svg></div>);
};

export default Shape;