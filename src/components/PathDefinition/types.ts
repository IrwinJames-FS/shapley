import { ComponentPropsWithoutRef } from "react";
import { WithComponents } from "../types";


/**
 * The component based props. This is separated in the event the component property needs to be modified.
 */
export type PathDefinitionProps = WithComponents<BasePathDefinitionProps & ComponentPropsWithoutRef<"path">, PathDefinitionComponents>;

/**
 * A path definition is the lowest level component used to render a &lt;path&gt; component.
 * 
 * this component renders a path and clipPath component.
 */
export type BasePathDefinitionProps = {
	/**
	 * A path definition must be provided a unique id. This is used to reference the path.
	 */
	id: string

	/**
	 * If object bounding is pass through the all geometries will be normalized. This is benefitial if using the same path to clip an html element.
	 */
	objectBounding?: boolean
};

/**
 * The &lt;clipPath&gt; components props can be overriden as well by passing the properties to the **components.clipPath** property
 */
export type PathDefinitionComponents = {
	clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "id">
}