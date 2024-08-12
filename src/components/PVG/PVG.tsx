import { FC } from "react";
import { PVGProps } from "./types";
import { v4 } from "uuid";
import { clsfy, vars } from "../../utilities";
import './style.scss';

/**
 * PVG is the lowest level rendering element. this element typically renders a path, clipPath which it uses to create a shape that is only stroked inside the shape. If the cached flag is set the path and clipPath will not be used and it is expected the xlinkHref property is defined.
 * @param props
 * @returns 
 */
const PVG: FC<PVGProps> = ({
	cached=false,
	d,
	xlinkHref,
	pstyle: {
		bgColor= 'transparent',
		borderColor = '#000',
		borderWidth = 0,
		shadow = undefined
	}={},
	components:{
		svg:{
			className="",
			style={},
			viewBox='0 0 1 1',
			...svgProps
		}={},
		path:{
			id = v4(),
			...pathProps
		}={},
		clipPath={},
	}={},
}) => (<svg {...{
	className: clsfy(className, "shapely-pvg"),
	style: {
		...style,
		...vars({
			bgColor,
			borderColor,
			borderWidth,
			shadow: !shadow 
			? "none"
			: (Array.isArray(shadow) 
				? shadow
				:[shadow, shadow])
			.filter(s=>s !== "none")
			.map(s=>s 
				? s.split(',').map(v=>`drop-shadow(${v})`).join(" ")
				:"none"
			)
		}, ['','hover-'])
	},
	viewBox,
	preserveAspectRatio: "none",
	...svgProps
}}>

{/*https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn*/}
{!cached && <defs>
	<path {...{d,id, ...pathProps}}/>
	<clipPath id={id+"-clip"} {...clipPath}>
		<use xlinkHref={'#'+id}/>
	</clipPath>
</defs>}
<use {...{
	xlinkHref: cached ? xlinkHref:"#"+id,
	clipPath: `url(${cached ? xlinkHref:'#'+id}-clip)`
}}/>
</svg>);

export default PVG;