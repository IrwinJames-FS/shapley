import { FC } from "react";
import { ShapeProps } from "./types";
import { ShapeDefinition } from "../ShapeDefinition";
import { v4 } from "uuid";

/**
 * The Shape component has two modes of operation
 * 
 * The first method is to provide a geometry and optionally an id to associate the definition to. When used this way the Shape component will define the geometry using SVG path commands.
 * 
 * The second method is to provide an href path to lookup a predefined geometry and create an instance of said geometry. While this method does not require a shape be redefined. 
 */
export const Shape: FC<ShapeProps> = ({
	id,
	geometry,
	href,
	components: {
		svg = {},
		use = {},
		path,
		clipPath
	} = {}
}) => {
	if(!geometry && !href) throw new Error("A shape either needs a geometry or a reference to work");
	const identifier = geometry ? (id ?? v4()):href;
	return (<svg {...svg}>
		{geometry && <defs>
			<ShapeDefinition geometry={geometry} id={identifier} components={{path, clipPath}}/>
		</defs>}
		<use href={'#'+identifier} {...use}/>
	</svg>);
}