import { ElementType, useMemo } from "react";
import { ShapeProps } from "./types";
import './style.scss';
import ngon from "../../geometry/ngon";
import { PolyMorphic } from "../PolyMorph/types";
import { v4 } from "uuid";
import { vars } from "../../utilities";

/**
 * The shape component is currently purely a client side component.
 * @param param0 
 * @returns 
 */
const Shape = <T extends ElementType = "div">({
	as,
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
	shapeId,
	...props
	
}: PolyMorphic<ShapeProps, T>) => {
	const El = as || "div";
	const [aspectRatio,viewBox, d] = useMemo(()=>gon ?? ngon(sides, rotation * Math.PI / 180, cornerRadius), [sides, rotation, cornerRadius]);
	const id = shapeId ?? v4();
	return (<El {...{
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
		},
		...props,
	}}>
		<svg {...{
		viewBox,
		preserveAspectRatio: 'none'
	}}>
		{/*https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn*/}
		<defs>
			<path {...{d, id}}/>
			<clipPath id={id+"-clip"}>
				<use xlinkHref={"#"+id}/>
			</clipPath>
		</defs>
		<use xlinkHref={"#"+id} clipPath={`url(#${id}-clip)`}/>
	</svg>
	{children}
	</El>);
};

export default Shape;