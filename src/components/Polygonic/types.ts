import { SVGCanvasProps } from "../SVGCanvas"
import { PStyle } from "../types"

export type BasePolygonicProps = {
	sides: number,
	rotation?: number
	cornerRadius: number
}

export type PolygonicProps = SVGCanvasProps & PStyle & BasePolygonicProps;