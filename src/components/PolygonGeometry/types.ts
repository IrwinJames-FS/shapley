import { GeometryProps } from "../Geometric/types";

export type PolygonProps = Omit<GeometryProps, "geometry"> & {
	sides?: number
	rotation?: number
}