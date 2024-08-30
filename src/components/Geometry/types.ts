import { BaseGeometricProps } from "../Geometric";
import { SVGCanvasProps } from "../SVGCanvas";
import { PUnit } from "../types";

export type BaseGeometryProps = {
	svg: SVGCanvasProps
};

export type GeometryProps = BaseGeometricProps & BaseGeometryProps & PUnit