import { ComponentPropsWithoutRef } from "react";

/**
 * A path definition is the lowest level component used to render a &lt;path&gt; component.
 * 
 * this component renders a path and clipPath component.
 */
export type BasePathDefinitionProps = ComponentPropsWithoutRef<"path"> & {
	/**
	 * The no clip command is a flag that can be used to prevent a path from being automatically closed with the *z* command
	 */
	noclip?: boolean
	
	/**
	 * A path definition must be provided a unique id. This is used to reference the path.
	 */
	id: string
};

export type PathDefinitionComponents = {
	clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "id">
}

/**
 * The component based props. This is separated in the event the component property needs to be modified.
 */
export type PathDefinitionProps = BasePathDefinitionProps & {
	/**
	 * The options method will be a place to tweak the rendering beyond the Points path command method. 
	 */
	components?: PathDefinitionComponents
}