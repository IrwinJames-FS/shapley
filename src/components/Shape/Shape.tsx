import { FC, useMemo } from "react";
import { ShapeProps } from "./types";
import './style.scss';
import ngon from "../../geometry/ngon";

/**
 * The shape component is currently purely a client side component.
 * @param param0 
 * @returns 
 */
const Shape: FC<ShapeProps> = ({
	sides=3, 
	rotation=0, 
	cornerRadius=0, 
	children, 
	backgroundColor="#F00", 
	className,
	style={}
}) => {
	const [aspectRatio,viewBox, d] = useMemo(()=>ngon(sides, rotation * Math.PI / 180, cornerRadius), [sides, rotation, cornerRadius]);
	return (<div {...{
		className: ["shapely-shape", className].filter(v=>!!v).join(' '),
		style: {
			aspectRatio, 
			...style
		}
	}}>
		<svg {...{
		viewBox,
		preserveAspectRatio: 'none'
	}}>
		<path {...{d, fill:backgroundColor}}/>
	</svg>
	{children}
	</div>);
};

export default Shape;