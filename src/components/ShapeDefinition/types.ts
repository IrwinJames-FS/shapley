import { ComponentPropsWithoutRef } from "react"
import { Geometry } from "../../geometry"

export type ShapeDefinitionComponents = {
	path?: Omit<ComponentPropsWithoutRef<"path">, "d" | "id">
	clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "children">
}

export type ShapeDefinitionProps = {
	/**
	 * The id provided will be used on the child path element. the same ID with the suffix -clip will be applied to the clipPath element. and if I add masks a mask definition will be suffixed with -mask.
	 */
	id: string
	/**
	 * A shape definition is used to generate points by connecting the lines by default with the L tag.
	 */
	geometry: Geometry

	/**
	 * The Shape Definition creates a fragment which provides these two components. aside from the necessary properties the component object can be used to override default or unused properties supported by the svg spec.
	 */
	components?: ShapeDefinitionComponents
}
