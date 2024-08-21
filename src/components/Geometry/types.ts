import { ReactNode } from "react";
import { SVGCanvasProps } from "../SVGCanvas";
import { GeometryDescriptor, PStyle } from "../types";

export type GeometryProps = {
	children?: ReactNode
	svg?: SVGCanvasProps
} & PStyle & GeometryDescriptor