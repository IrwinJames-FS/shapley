import { GeometryDefinitionProps } from "../GeometryDefinition/types";

export type BasePolygonDefinitionProps = {
	/**
	 * The number of sides used to generate the polygon
	 */
	sides?: number
	/**
	 * The degrees of rotation to be applied to the shape.
	 */
	rotation?: number

	/**
	 * The Corner Radius
	 */
	cornerRadius?: number | number[]
}


export type PolygonDefinitionProps = Omit<GeometryDefinitionProps, "geometry"> & BasePolygonDefinitionProps;