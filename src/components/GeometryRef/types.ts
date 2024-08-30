import { ComponentPropsWithoutRef } from "react";
import { PStyle } from "../types";

/**
 * The Base Geometry props are the props specific to the the rendering process.
 */
export type BaseGeomtryRefProps = {
	/**
	 * Unlink xlinkHref src is required and will populate both xlinkhref as well as clip path
	 */
	src?: string
}

/**
 * The BaseGeometryElementProps Adopts all of the props available to the **&lt;use&gt;** component
 */
export type BaseGeometryRefElementProps = Omit<ComponentPropsWithoutRef<"use">, "href" | "src"> 

export type GeometryRefProps = BaseGeometryRefElementProps & PStyle & BaseGeomtryRefProps