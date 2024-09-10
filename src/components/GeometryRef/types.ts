import { ComponentPropsWithoutRef } from "react";

export type GeometryRefProps = Omit<ComponentPropsWithoutRef<"use">, "href"> & BaseGeomtryRefProps;

/**
 * The Base Geometry props are the props specific to the the rendering process.
 */
export type BaseGeomtryRefProps = {
	/**
	 * Unlike href src is required and will populate both href as well as clip path
	 */
	src?: string

	/**
	 * Clipping a shape is not always necessary. but if you are using a clipped definition this can be provided to the ref to instruct it to populate the clip path using shapelys clipping convention. 
	 */
	clipped?: boolean
}



