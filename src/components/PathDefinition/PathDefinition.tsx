import { FC } from "react";
import { PathDefinitionProps } from "./types";

/**
 * The Path definition defined a path with an ID. This ID will be used throughout the rendering process to references the path and clipPath
 * 
 * Typically this would be used inside a defs container.
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
	<use xlinkHref={'#'+id}/>
</clipPath>}
</>);

export default PathDefinition;