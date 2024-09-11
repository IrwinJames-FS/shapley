import { Points } from "../../geometry"
import { PathDefinitionProps } from "../PathDefinition"
/**
 * This type accepts a geometry property that expects an instance of a Points class. In addition to this it accepts all the base properties of a PathDefinition.
 */
export type GeometryDefinitionProps = BaseGeometryDefinitionProps & Omit<PathDefinitionProps, "d">;

/**
 * A Geometry Definition is an extension of a path definition that uses the command M, L, and Q to generate shapes from a collection of points.
 */
export type BaseGeometryDefinitionProps = {
	/**
	 * The **Points** class that is used to generate the path commands. 
	 */
	geometry: Points
}


