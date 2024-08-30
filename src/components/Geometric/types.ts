import { BaseGeometryDefinitionElementProps, BaseGeometryDefinitionProps } from "../GeometryDefinition";
import { SVGCanvasProps } from "../SVGCanvas";
import { BaseGeometryRefElementProps, BaseGeomtryRefProps } from "../GeometryRef";
import { Points } from "../../geometry";
import { PStyle } from "../types";

export type BaseGeometricProps = {
	/**
	 * By setting this to true a clip path is not used to limit the shape.
	 */
	noclip?: boolean,

	/**
	 * If a pathId is provided this property should also be applied
	 */
	aspectRatio?: string

	/**
	 * You can interface with the svg wrapping svg here
	 */
	svg?: SVGCanvasProps
	
	/**
	 * Multiple geometries can be rendered in a Geometric but only the first will be reference to define the viewbox. A custom viewbox can be provided.
	 */
	geometry?: Points | Points[]

	use?: BaseGeometryRefElementProps
	def?: BaseGeometryDefinitionElementProps
}

export type GeometricProps = BaseGeometricProps & BaseGeomtryRefProps & Partial<Omit<BaseGeometryDefinitionProps, "geometry">> & SVGCanvasProps & PStyle;