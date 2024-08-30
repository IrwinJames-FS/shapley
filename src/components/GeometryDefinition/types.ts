import { Points } from "../../geometry"
import { PathDefinitionProps } from "../PathDefinition"

/**
 * A Geometry Definition is an extension of a path definition that uses the command M, L, and Q to generate shapes from a collection of points.
 */
export type BaseGeometryDefinitionProps = {
	/**
	 * The **Points** class that is used to generate the path commands. 
	 */
	geometry: Points

	/**
	 * If object bounding is pass through the all geometries will be normalized. This is benefitial if using the same path to clip an html element.
	 */
	objectBounding?: boolean
}

export type BaseGeometryDefinitionElementProps = Omit<PathDefinitionProps, "d">

export type GeometryDefinitionProps = BaseGeometryDefinitionElementProps & BaseGeometryDefinitionProps