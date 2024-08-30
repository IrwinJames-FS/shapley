
import { GeometryProps } from "../Geometry";
import { BasePolygonicProps } from "../Polygonic";
import { PUnit } from "../types";

export type PolygonProps = Omit<GeometryProps, "geometry" | "children"> & PUnit & BasePolygonicProps;

export type PolygonsProps = Omit<PolygonProps, "sides">