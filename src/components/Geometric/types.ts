import { GeometryDefinitionProps } from "../GeometryDefinition";
import { BaseGeomtryRefProps, GeometryRefProps } from "../GeometryRef";
import { Points } from "../../geometry";
import { PStyle, WithComponents } from "../types";
import { BasePathDefinitionProps, PathDefinitionComponents } from "../PathDefinition";
import { SVGCanvasProps } from "../SVGCanvas";

export type GeometricProps = WithComponents<BaseGeometricProps & SVGCanvasProps & PStyle, GeometricComponents>;
/**
 * The Base Geometric Props type provides an interface to interact with the SVG backing layer as well as its underlying components. 
 * 
 * Currently this provides properties to either generate shape or reference shapes. 
 * 
 * @todo Should references and generating really be in the same component?
 */
export type BaseGeometricProps = {
	/**
	 * If a pathId is provided this property should also be applied
	 */
	aspectRatio?: string
	
	/**
	 * viewBox is an exising SVG Property however because it is passed as a base property later it seems we need to include it explicitly
	 */
	viewBox?: string //while this is defined in svg it wont be defined later on
	/**
	 * Multiple geometries can be rendered in a Geometric but only the first will be reference to define the viewbox. A custom viewbox can be provided.
	 */
	geometry?: Points | Points[]
} & Omit<BasePathDefinitionProps, "id"> & BaseGeomtryRefProps;

export type GeometricComponents = {
	/**
	 * If definition &lt;path&gt;s are being defined props can be overriden using this property
	 */
	definition?: Omit<GeometryDefinitionProps, "geometry" | "components">

	/**
	 * Reference &lt;use&gt; default props can be overriden. 
	 */
	reference?: Omit<GeometryRefProps, "src">
	
} & PathDefinitionComponents

