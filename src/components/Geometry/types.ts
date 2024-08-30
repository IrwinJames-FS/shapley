import { BaseGeometricProps, GeometricComponents } from "../Geometric";
import { SVGCanvasProps } from "../SVGCanvas";
import { PStyle, PUnit } from "../types";


export type GeometryComponents = {
	/**
	 * Geometry moves the svg prop to the components section so it can be modified as well. 
	 */
	svg?: SVGCanvasProps
} & GeometricComponents

export type GeometryComponentsProps = {
	components?: GeometryComponents
}
export type GeometryProps = BaseGeometricProps & GeometryComponentsProps & PUnit & PStyle