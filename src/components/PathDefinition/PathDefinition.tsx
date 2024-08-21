import { FC } from "react";
import { PathDefinitionProps } from "./types";

/**
 * The Path definition defined a path with an ID. This ID will be used throughout the rendering process to references the path and clipPath
 * 
 * Typically this would be used inside a defs container.
 * 
 * 
 * it is important to note that the id provided will be reused to identify multiple components. For example this component creates both a path and clip path using the provided path commands. the id for the clip path is <id>-clip. In the future masks and feEffects may be added 
 * 
 * @param param0 
 * @returns 
 */
const PathDefinition: FC<PathDefinitionProps> = ({
	noclip,
	options:{
		clipPath={},
	}={}, 
	id,
	...props})=>(<>
<path {...{id, ...props}}/>
{!noclip && <clipPath id={id+'-clip'} {...clipPath}>
	<use href={"#"+id}/>
</clipPath>}
</>);

export default PathDefinition;