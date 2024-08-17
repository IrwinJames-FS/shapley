import { Points } from "../../geometry"
import { PathDefinitionProps } from "../PathDefinition"

export type GeometryDefinitionProps = Omit<PathDefinitionProps, "d"> & {
	geometry: Points
}