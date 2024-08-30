import { Points } from "../../geometry"
import { PathDefinitionProps } from "../PathDefinition"

export type GeometryDefinitionProps = Omit<PathDefinitionProps, "d"> & {
	/**
	 * The **Points** class that is used to generate the path commands. 
	 */
	geometry: Points

	/**
	 * If object bounding is pass through the all geometries will be normalized. This is benefitial if using the same path to clip an html element.
	 */
	objectBounding?: boolean
}