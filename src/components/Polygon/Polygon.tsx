import { ComponentPropsWithoutRef, ElementType, FC, useMemo } from "react";
import { PolyMorphicProps } from "../types";
import { D } from "~/src/geometry";
import { Shape } from "../Shape";
import { ShapeCache } from "../ShapeCache";

export type PolygonProps<T extends ElementType = ElementType> = PolyMorphicProps<T, {
	/**
	 * The number of sides that should the polygon will have.
	 */
	sides: number

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
 * The polygons component simplifies the interaction when generating normal polgyons. in addition with building the path commands polygon will try to load the necessary information from the cache prior to rendering. 
 * 
 * (Something I have not had a chance to test is if the generated polygon can be broken by being detected on rerender which results in the cache not being rendered. If it does I will look into implementing some cross environment memoization.)
 */
export const Polygon: FC<PolygonProps> = ({sides, cornerRadius=0, rotation=0, forceDraw, children, ...props}) => {
	//check if the cache has a defined polygon. 
	const id = useMemo(()=>`polygon-${sides}-${cornerRadius}-${rotation}`.replace(/\./g, '_'), [sides, rotation, cornerRadius]);
	const isCached = useMemo(()=>id in D.cache, [id]);
	if(isCached && !forceDraw) return <Shape sref={id} {...props}>{children}</Shape>
	const polygon = D.polygon(sides, 1, [0,0], rotation, cornerRadius).toObjectBounding();
	return (<>
	<ShapeCache shapes={{[id]:polygon}}/>
	<Shape sref={id} {...props}>{children}</Shape>
	</>)
}