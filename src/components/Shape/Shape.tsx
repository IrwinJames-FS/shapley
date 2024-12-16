import { ComponentPropsWithoutRef, ElementType, FC, PropsWithChildren } from "react";
import { D } from "~/src/geometry/D";
import './style.css';
import { v4 } from "uuid";
import { PolyMorphicProps } from "../types";
import { ShapeDefinition } from "../ShapeDefinition";
import { ShapeCache } from "../ShapeCache/ShapeCache";

export type ShapeProps<T extends ElementType = ElementType> = PolyMorphicProps<T, ({
	/**
	 * d can be a string or an instance of D.
	 */
	d: D,

	/**
	 * If a d
	 */
	pathProps?: Omit<ComponentPropsWithoutRef<"path">, "d">,
} | {
	/**
	 * Shapes can also be rendered from a cached shape.
	 * 
	 * It is recommended if you use a cached shape you convert the shape using toObjectBounding or the ShapeCache's allObjectBounding.
	 */
	sref: string
}) & {
	/**
	 * The fill value is hoisted from the useProps however can also be passed via the useProps property.
	 */
	fill?: string,

	/**
	 * The stroke value is hoisted from the useProps however can also be passed via the useProps property.
	 */
	stroke?: string,

	/**
	 * The strokeWidth value is hoisted from the useProps however can also be passed via the useProps property.
	 */
	strokeWidth?: number | string


	/**
	 * Each shape is rendered via an svg's use tag. 
	 * 
	 * This property allows you to directly interface with the use component.
	 */
	useProps?: Omit<ComponentPropsWithoutRef<"use">, "href">,

	/**
	 * All shapes are SVG path commands stored within either the child svg or an external svg within the same DOM.
	 */
	svgProps?: ComponentPropsWithoutRef<"svg">
}>


/**
 * The shape component is a general use component which accepts children and uses an svg to represent the shape as a background component.
 * 
 */
export const Shape:FC<ShapeProps> = ({as:Component = "div", sref, d, fill, stroke, strokeWidth, clipped, className, children, svgProps:{viewBox, preserveAspectRatio, style:svgStyle, ...svgProps}={}, pathProps={}, useProps={}, style={}, ...props})=>{
	d = d ?? D.cache[sref];
	if(!d) throw new Error("No shape provided or cached");

	const id = sref ? sref : v4();
	fill = fill ?? useProps.fill
	stroke = stroke ?? useProps.stroke
	strokeWidth = strokeWidth ?? useProps.strokeWidth
	const cache = !sref && <ShapeCache shapes={{[id]: d.toObjectBounding()}}/>;
	return (<>
	{cache}
	<Component {...{
		className: [className, 'shapley-shape'].filter(a=>a).join(' '),
		...props,
		style: {
			'--shapley-bg-color': fill,
			'--shapley-stroke-color': stroke,
			'--shapley-stroke-width': strokeWidth,
			'--shapley-clip': `url(#${id}-clip)`,
			aspectRatio: d.aspectRatio,
			...style
		}
	}}>
		<svg {...{
			preserveAspectRatio: preserveAspectRatio ?? "none",
			viewBox: viewBox ?? d.viewBox,
			style: {
				aspectRatio: d.aspectRatio,
				...svgStyle
			},
			...svgProps,
			}}>
			
			<use href={"#"+id} {...{strokeWidth, ...useProps}}/>
		</svg>
		{children}
	</Component>
	</>);
}