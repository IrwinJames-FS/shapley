import { FC } from "react";
import { ShapleyDefinitionProps } from "./types";

/**
 * Creates a Shapley definition that can be reused.throughout the file
 * @param props 
 * @returns 
 */
export const ShapleyDefinition: FC<ShapleyDefinitionProps> = ({id, d})=>(<>
	<path {...{
		id,
		d
	}}/>
	<clipPath {...{
		id: id+'-clip'
	}}>
		<use href={"#"+id}/>
	</clipPath>
</>)