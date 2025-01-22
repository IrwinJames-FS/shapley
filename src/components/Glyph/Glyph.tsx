import { type ComponentPropsWithoutRef, type FC, ReactNode } from "react";
import { D } from "../../geometry/D";
export type GlyphProps = {
	/**
	 * The path command can be provided as a string path command or as a D path
	 */
	d: string | D

	/**
	 * The expected width of the glyph
	 * 
	 * *this property is passed to the svg props*
	 */
	width?: string

	/**
	 * The expected height of the glyph
	 * 
	 * *this property is passed to the svg props*
	 */
	height?: string

	/**
	 * The viewbox expected to be applied to the svg component. 
	 * 
	 * If none is provided a viewbox will be calculated based on the command paths.
	 * *this property is passed to the svg props*
	 */
	viewBox?: string
	/**
	 * svg props can be modified via this object.
	 */
	svgProps?: ComponentPropsWithoutRef<"svg">
} & Omit<ComponentPropsWithoutRef<"path">, "d">


/**
 * Glyph can be used to render a custom SVG paths on the fly. 
 * 
 * I do plan on adding support to utilize more svg features directly however for now this elevates and renders an svg component with a single path element. the props provided are passed to said path component.
 */
export const Glyph = ({d, width, height, viewBox, svgProps:{viewBox:svgViewBox, style, ...svgProps}={}, ...props}: GlyphProps): ReactNode => {
	const p = typeof d === 'string' ? new D(d):d;
	const geo = ''+p;
	return (<svg {...{
		...svgProps,
		viewBox: viewBox ?? svgViewBox ?? p.viewBox,
		width,
		height,
		style:{
			...style
		}
	}}>
		<path d={geo} {...props}/>
	</svg>)
}