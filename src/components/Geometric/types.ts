import { BaseGeometryDefinitionElementProps, BaseGeometryDefinitionProps } from "../GeometryDefinition";
import { SVGCanvasProps } from "../SVGCanvas";
import { BaseGeomtryRefProps } from "../GeometryRef";
import { Points } from "../../geometry";
import { PStyle } from "../types";
import { PathDefinitionComponents } from "../PathDefinition";

/**
 * The Base Geometric Props type provides an interface to interact with the SVG backing layer as well as its underlying components. 
 * 
 * Currently this provides properties to either generate shape or reference shapes. 
 * 
 * @todo Should references and generating really be in the same component?
 */
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
	 * Multiple geometries can be rendered in a Geometric but only the first will be reference to define the viewbox. A custom viewbox can be provided.
	 */
	geometry?: Points | Points[]
}

export type GeometricComponents = {
	/**
	 * If custom use properties are necessary you can provide them here.
	 */
	use?: BaseGeomtryRefProps

	/**
	 * If you have custom properties for the paths that are used to define the shape(s) you can provide them here. 
	 */
	def?: BaseGeometryDefinitionElementProps
} & PathDefinitionComponents

export type GeometricComponentsProp = {
	components?: GeometricComponents
}

export type GeometricProps = GeometricComponentsProp & BaseGeometricProps & BaseGeomtryRefProps & Partial<Omit<BaseGeometryDefinitionProps, "geometry">> & SVGCanvasProps & PStyle;