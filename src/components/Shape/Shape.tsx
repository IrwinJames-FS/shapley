import { FC, useMemo } from "react";
import { ShapeProps } from "./types";
import './style.scss';
import ngon from "../../geometry/ngon";
import { vars } from "../../utilities";
import { PolyMorphic } from "../PolyMorph/types";
import PolyMorph from "../PolyMorph/PolyMorph";
import { v4 } from "uuid";

/**
 * The shape component is currently purely a client side component.
 * @param param0 
 * @returns 
 */
const Shape: PolyMorphic<ShapeProps> = ({
	as = "div",
	gon,
	sides=3, 
	rotation=0, 
	cornerRadius=0, 
	children, 
	backgroundColor:bgColor="transparent", 
	borderColor="transparent",
	borderWidth=2,
	shadow = "none",
	className,
	style={},
	...props
	
}) => {
	const [aspectRatio,viewBox, d] = useMemo(()=>gon ?? ngon(sides, rotation * Math.PI / 180, cornerRadius), [sides, rotation, cornerRadius]);
	const id = v4();
	return (<PolyMorph {...{
		...props,
		className: ["shapely-shape", className].filter(v=>!!v).join(' '),
		style: {
			aspectRatio, 
			...style,
			...vars({
				bgColor,
				borderColor,
				borderWidth: typeof borderWidth === 'number' ? borderWidth+'px':borderWidth,
				shadow: !shadow ? "none": shadow === "none" ? shadow: typeof shadow === "string" ? shadow.split(',').map((v:string)=>`drop-shadow(${v})`).join(" "):"none" //the last evaluation is for storybooks sake.
			})
		}
	}}>
		<svg {...{
		viewBox,
		preserveAspectRatio: 'none'
	}}>
		<defs>
			{/* https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn (this is the cleanest solution i have seen)*/}
			<path {...{d, id}}/>
			<clipPath id={id+"-clip"}>
				<use xlinkHref={"#"+id}/>
			</clipPath>
		</defs>
		<use xlinkHref={"#"+id} clipPath={`url(#${id}-clip)`}/>
	</svg>
	{children}
	</PolyMorph>);
};

export default Shape;