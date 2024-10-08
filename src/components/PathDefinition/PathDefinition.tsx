import { FC } from "react";
import { PathDefinitionProps } from "./types";

/**
 * The Path definition defined a path with an ID. This ID will be used throughout the rendering process to references the path and clipPath
 * 
 * Typically this would be used inside a defs container.
 * 
 * 
 * it is important to note that the id provided will be reused to identify multiple components. For example this component creates both a path and clip path using the provided path commands. the id for the clip path is <id>-clip. In the future masks and feEffects may be added 
 */
const PathDefinition: FC<PathDefinitionProps> = ({
	objectBounding,
	components:{
		clipPath={},
	}={}, 
	id,
	...props})=>(<>
<path {...{id, ...props}}/>
<clipPath {...{
	id:id+'-clip',
	clipPathUnits: objectBounding ? 'objectBoundingBox':undefined,
	...clipPath
}} {...clipPath}>
	<use href={"#"+id}/>
</clipPath>
</>);

export default PathDefinition;