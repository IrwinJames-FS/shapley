import { FC } from "react";
import { GeometryDefinitionProps } from "./types";

/**
 * The geometry definition Component is the component responsible for adding the Geometry instance to the dom. It is recommended that this component be used within a **defs** tag as it also generates a **clipPath**.
 * 
 * the **path** and **clipPath** component properties can be overriden or customized by utilizing the **components** property.
 * @param param0 
 * @returns 
 */
export const GeometryDefinition: FC<GeometryDefinitionProps> = ({
	id, 
	geometry,
	components:{path={}, clipPath={}}={},
}) => {
	return (<>
		<path {...{
			id,
			d:''+geometry,
			...path
		}}/>
		<clipPath {...{
			id: id+'-clip',
			...clipPath
		}}>
			<use href={"#"+id}/>`
		</clipPath>
	</>)
}