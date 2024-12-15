import { type ComponentPropsWithoutRef, type FC, ReactElement } from "react";
import { D } from "~/src/geometry/D";
type GlyphProps = {
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
	 * svg props can be modified via this object.
	 */
	svgProps?: ComponentPropsWithoutRef<"svg">
} & Omit<ComponentPropsWithoutRef<"path">, "d">
/**
 * Glyph can be used to render a custom SVG paths on the fly. 
 * 
 * I do plan on adding support to utilize more svg features directly however for now this elevates renders an svg component with a single path element. the props provided are passed to said path component
 * @param props
 * @returns 
 */
export const Glyph: FC<GlyphProps> = ({d, width, height, svgProps:{viewBox, ...svgProps}={}, ...props}): ReactElement => {
	const p = typeof d === 'string' ? new D(d):d;
	const geo = ''+p;
	return (<svg {...{
		...svgProps,
		viewBox: viewBox ?? p.viewBox,
		width,
		height,
	}}>
		<path d={geo} {...props}/>
	</svg>)
}