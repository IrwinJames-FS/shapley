import { FC, ComponentPropsWithoutRef } from "react";
import D from "~/geometry/D";

const Glyph: FC<{
	/**
	 * The path command can be provided as a string path command or as a D path
	 */
	d: string | D
	width?: string
	height?: string
	svgProps?: ComponentPropsWithoutRef<"svg">
} & Omit<ComponentPropsWithoutRef<"path">, "d">> = ({d, width, height, svgProps:{viewBox, ...svgProps}={}, ...props}) => {
	const p = typeof d === 'string' ? new D(d):d;
	const geo = ''+p;
	console.log(viewBox)
	return (<svg {...{
		...svgProps,
		viewBox: viewBox ?? p.viewBox,
		width,
		height,
	}}>
		<path d={geo} {...props}/>
	</svg>)
}

export default Glyph;