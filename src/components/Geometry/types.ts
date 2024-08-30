import { SVGCanvasProps } from "../SVGCanvas";
import { GeometryDescriptor, PStyle, PUnit } from "../types";

export type GeometryProps = {
	/**
	 * If you need to modify the properties provided to the background layer this can be used.
	 */
	svg?: SVGCanvasProps
} & PStyle & GeometryDescriptor & PUnit