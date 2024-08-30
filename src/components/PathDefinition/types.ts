import { ComponentPropsWithoutRef } from "react";

export type PathDefinitionProps = ComponentPropsWithoutRef<"path"> & {
	/**
	 * The no clip command is a flag that can be used to prevent a path from being automatically closed with the *z* command
	 */
	noclip?: boolean
	
	/**
	 * A path definition must be provided a unique id. This is used to reference the path.
	 */
	id: string

	/**
	 * The options method will be a place to tweak the rendering beyond the Points path command method. 
	 */
	options?: {
		/**
		 * Custom clip path properties can be passed to the clip path component that is used to refine the stroke.
		 */
		clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "id">
	}
};

