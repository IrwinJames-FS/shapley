import { Points } from "../../geometry"
import { SVGCanvasProps } from "../SVGCanvas"
import { PStyle } from "../types"


export type BaseGeometricProps = {
	geometry: Points
} 

export type GeometricProps = BaseGeometricProps & SVGCanvasProps & PStyle