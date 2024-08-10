import { ElementType } from "react";
import { PolyMorphic } from "../PolyMorph/types";
import { CSSPropertiesPlusVars, ShapeProps } from "../Shape/types";


/**
 * The Poly grid is designed to provide a standardized method of dictating custom layouts by mutating css variables and properties
 * 
 * The Shape Property accepts the Morphable version of the shape properties which will be reused to generate each cell. 
 */
export type PolyGridProps<S extends ElementType> = {
	shape: PolyMorphic<ShapeProps, S>
	rowSize: number, //This is used to determine the 
	rowSizeTransformer?: (rs: number)=>number
	layout?: (index: number, size: number) => {style?: CSSPropertiesPlusVars, shape?: Partial<PolyMorphic<ShapeProps, S>>}
	gridCellTemplate?: string
	gridRowTemplate?: string
	gridRowSuffix?: string
	gridCellSize?: [number | undefined, number | undefined]
	spacing?: number | string
}