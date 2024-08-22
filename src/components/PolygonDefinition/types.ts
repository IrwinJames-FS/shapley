import { GeometryDefinitionProps } from "../GeometryDefinition/types";

export type PolygonDefinitionProps = Omit<GeometryDefinitionProps, "geometry"> & {
	sides?: number
	rotation?: number
	cornerRadius?: number | number[]
}