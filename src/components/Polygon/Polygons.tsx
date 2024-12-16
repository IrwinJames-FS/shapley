import { ComponentPropsWithoutRef, ElementType, FC } from "react";
import { PolyMorphicProps } from "../types";
import { Polygon } from "./Polygon";

export type PgonProps<T extends ElementType = ElementType> = PolyMorphicProps<T, {
	/**
	 * The rounding factor applied to each point.
	 */
	cornerRadius?: number

	/**
	 * A convenience property to set the fill. this value can also be set by setting the --shapley-bg-color variable via css as well. 
	 * 
	 * due to the way shapley renders the background-color property can be utilized instead of fill or in conjnction with the fill property. 
	 */
	fill?: string

	/**
	 * A convenience property to set the stroke. Normal borders are not applicable to custom shapes instead a reference to the shape is created and used as a background layer. this property changes the stroke color
	 * 
	 * this property can also be changed by setting the --shapley-stroke-color variable in css.
	 */
	stroke?: string

	/**
	 * A convenience perperty to set the stroke width.
	 * 
	 * this property can also be changed by setting the --shapley-stroke-width variable in css.
	 * 
	 * Due to the way shapley renders the background layer half the stroke width will be clipped. 
	 * 
	 */
	strokeWidth?: string

	/**
	 * The rotation to be applied during the polygons generation process.
	 */
	rotation?: number

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

	/**
	 * in some contexts where javascript is shared but html this components caching system will not work. A shape can be force rendered by setting this boolean. 
	 * 
	 * Storybook for example uses sort of browser renderer. 
	 */
	forceDraw?: boolean
}>;

/**
 * Render a triangle.
 * @param props 
 * @returns 
 */
export const Triangle: FC<PgonProps> = props => <Polygon sides={3} {...props}/>;

/**
 * Render a diamond.
 * @param props 
 * @returns 
 */
export const Diamond: FC<PgonProps> = props => <Polygon sides={4} {...props}/>;

/**
 * Render a pentagon.
 * @param props 
 * @returns 
 */
export const Pentagon: FC<PgonProps> = props => <Polygon sides={5} {...props}/>;

/**
 * Render a hexagon.
 * @param props 
 * @returns 
 */
export const Hexagon: FC<PgonProps> = props => <Polygon sides={6} {...props}/>;

/**
 * Render a heptagon.
 * @param props 
 * @returns 
 */
export const Heptagon: FC<PgonProps> = props => <Polygon sides={7} {...props}/>;

/**
 * Render an octagon.
 * @param props 
 * @returns 
 */
export const Octagon: FC<PgonProps> = props => <Polygon sides={3} {...props}/>;