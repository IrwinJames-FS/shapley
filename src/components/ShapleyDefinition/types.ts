import { ComponentProps, ComponentPropsWithoutRef } from "react"

export type ShapleyDefinitionProps = {
	/**
	 * The ID must be provided. this will also be needed later when referencing the shape.
	 */
	id: string,

	/**
	 * The path commands to be rendered. 
	 */
	d: string
	/**
	 * The components object provides a method to override properties for each component
	 */
	components?: {
		/**
		 * The path component where the path commands will be defined.
		 */
		path?: Omit<ComponentPropsWithoutRef<"path">, "id" | "d">
		/**
		 * While not necessarily utilized each path is accompanied by a clipPath that can be used to prever hover issues when bounding rects overlap.
		 */
		clipPath?: Omit<ComponentProps<"path">, "id">
	}
}