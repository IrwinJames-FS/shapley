import { GeometricProps } from "../Geometric";

export type PolygonicProps = Omit<GeometricProps, "geometry"> & BasePolygonicProps;

export type BasePolygonicProps = {
	/**
	 * The number of sides the polygon should have
	 */
	sides: number,

	/**
	 * The degrees the polygon should be rotated
	 */
	rotation?: number

	/**
	 * The corner radii used to round the corners of the shape.
	 * 
	 * If a single number is provided the number will be applied to all corners. If an array is provided the corners that are not defined in the array are assumed to be 0.
	 * 
	 * **Warning**: Most shapes are normalized meaning a corner radius of *0.1* is 10% of the view axis.
	 */
	cornerRadius?: number | number[]
}

