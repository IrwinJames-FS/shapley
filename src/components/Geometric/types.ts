import { Points } from "../../geometry"
import { SVGCanvasProps } from "../SVGCanvas"
import { PStyle } from "../types"


export type BaseGeometricProps = {
	geometry?: Points
	src?: string
} 

export type GeometricProps = BaseGeometricProps & SVGCanvasProps & PStyle