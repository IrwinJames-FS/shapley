import { Children, cloneElement, ComponentPropsWithoutRef, ElementType, FC, ReactElement } from "react";
import { D } from "../../geometry/D";
import './style.css';
import { v4 } from "uuid";
import { PolyMorphicProps } from "../types";
import { ShapeCache } from "../ShapeCache";
import { isTransitionalElement, mergeClasses } from "../../utils";

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
	sref?: string

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
export const Shape:FC<ShapeProps> = ({as:Component = "div", sref, d, fill, stroke, strokeWidth, clipped, className, children, svgProps:{ className: svgClassName, viewBox, preserveAspectRatio, ...svgProps}={}, pathProps={}, useProps={}, style={}, ...props})=>{
	const id = sref ? sref : d ? v4():undefined;
	fill = fill ?? useProps.fill
	stroke = stroke ?? useProps.stroke
	strokeWidth = strokeWidth ?? useProps.strokeWidth
	if(sref) {
		children = Children.map(children, (child, i)=>{
			if(!isTransitionalElement<ShapeProps>(child)) return child;
			if(((child.props?.className ?? "").includes("shapley-shape") || child.type === Shape)&& !child.props?.sref && !child.props?.d){
				return cloneElement(child, {sref});
			}
			return child;
		});
	}
	return (<>
	{!sref && id && d && <ShapeCache shapes={{[id]:d.toObjectBounding().cached()}}/>}
	<Component {...{
		className: [className, 'shapley-shape', id ? `shapley-shape-${id}`:undefined].filter(a=>a).join(' '),
		...props,
		style: {
			'--shapley-bg-color': fill,
			'--shapley-stroke-color': stroke,
			'--shapley-stroke-width': strokeWidth,
			...style
		}
	}}>
		<svg {...{
			className: mergeClasses(svgClassName)`shapley-shape-bg`,
			preserveAspectRatio: preserveAspectRatio ?? "none",
			viewBox: '0 0 1 1', //currently only supports objectBoundingBox
			...svgProps,
			}}>
				{/* Anonymous shapes no caching*/}
			<use href={"#"+id} {...{strokeWidth, ...useProps}}/>
		</svg>
		{children}
	</Component>
	</>);
}

Shape.displayName = "Shape";