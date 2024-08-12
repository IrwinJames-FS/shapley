import { CSSProperties, ReactNode } from "react";
import { Ngon } from "../../geometry/types";

export type CSSPropertiesPlusVars = CSSProperties & {
	[k: string]: string | number
}
/**
 * A shape can be rendered by providing a name or a shape descriptor.
 * 
 * If gon is provided its settings will override sides, rotation, cornerRadius
 * 
 * Shadow is unique as it will accept a comma separated list of drop-shadow arguments
 */
export type ShapeProps = { 
	backgroundColor?: string
	children?: ReactNode
	className?: string
	cornerRadius?: number
	borderWidth?: number | number
	borderColor?: string
	gon?: Ngon
	rotation?: number
	sides?: number
	style?: CSSPropertiesPlusVars
	shadow?: string
	shapeId?: string
};

