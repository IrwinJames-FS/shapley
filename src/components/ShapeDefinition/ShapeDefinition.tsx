import { ComponentPropsWithoutRef, FC } from "react";

export type ShapeDefinitionProps = {
	/**
	 * A definition must be provided an id.
	 */
	id: string,
	/**
	 * A shape cannot be defined without path commands
	 * 
	 * The d path command must be in objectBounding units (0-1).
	 */
	d: string,
} & Omit<ComponentPropsWithoutRef<"path">, "id" | "d">;

/**
 * This is a low level component used as a convenience method to render a path and clip path that can referenced elsewhere in the dom.
 * @param param0 
 * @returns 
 */
export const ShapeDefinition: FC<ShapeDefinitionProps> = ({id, d, ...props}) => (<>
	<path {...{id, d, ...props}}/>
	<clipPath {...{id: id+'-clip', clipPathUnits:"objectBoundingBox"}}>
		<use href={"#"+id}/>
	</clipPath>
</>);