import { ReactNode } from "react";
import { Points } from "../../geometry";
import { SVGCanvasProps } from "../SVGCanvas";
import { PStyle } from "../types";

export type GeometryProps = {
	geometry: Points
	children?: ReactNode
	svg: SVGCanvasProps
} & PStyle