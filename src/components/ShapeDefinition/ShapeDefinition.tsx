import { FC } from "react";
import { ShapeDefinitionProps } from "./types";

/**
 * Shape definition is a fragment that creates a path, clipPath and in the future may create a mask definition. This method is completely reliant upon a unique id. All visual representations will be references of these definitions.
 * 
 * This component has no visual representation and should typically be used within an svgs defs tag. 
 * 
 * To display definition the *use* tag can be utilized. additionally the definitions can be referenced in css as well in background images, clip paths and background images. 
 */
export const ShapeDefinition: FC<ShapeDefinitionProps> = ({
	id,
	geometry,
	components: {
		path={},
		clipPath={}
	} = {}
}) => (<>
	<path
		id={id}
		d={""+geometry}
		{...path}/>
	<clipPath
		id={id+"-clip"}
		{...clipPath}>
			<use href={"#"+id}/>
	</clipPath>
	</>);
