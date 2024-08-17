import { SVGCanvasProps } from "../SVGCanvas"
import { PStyle } from "../types"

export type PolygonProps = {
	sides: number
	rotation?: number
	cornerRadius?: number
	svg: SVGCanvasProps
} & PStyle

export type PolygonsProps = Omit<PolygonProps, "sides">