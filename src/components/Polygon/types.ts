import { SVGCanvasProps } from "../SVGCanvas"
import { PStyle } from "../types"

export type PolygonProps = {
	/**
	 * The number of sides the polygon will have
	 */
	sides: number

	/**
	 * The degrees of rotation that should be applied to the generated shape. 
	 */
	rotation?: number

	/**
	 * The radius used to round the corner. 
	 * 
	 * **Warning**: Most shapely shapes use normalized values so 0.1 would equate to 10% of the axis size.
	 */
	cornerRadius?: number

	/**
	 * The underlying SVG canvas props can be modified here.
	 */
	svg: SVGCanvasProps
} & PStyle

export type PolygonsProps = Omit<PolygonProps, "sides">