import { Points } from "../../geometry";
import { SVGCanvasProps } from "../SVGCanvas";
import { GeometryDescriptor, PStyle } from "../types";

export type GeometricProps = Omit<GeometryDescriptor, "aspectRatio" | "geometry"> & PStyle & SVGCanvasProps & {
	/**
	 * If this is checked then I assume the viewbox is 0 0 1 1
	 */
	objectBounding?: boolean,

	/**
	 * By setting this to true a clip path is not used to limit the shape.
	 */
	noclip?: boolean,

	/**
	 * Geometric can handle multiple geometries but the same style will be applied to all geometries.
	 */
	geometry?: Points | Points[]
}