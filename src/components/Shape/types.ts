import { CSSProperties, ReactNode } from "react";

export type CSSPropertiesPlusVars = CSSProperties & {
	[k: string]: string | number
}
/**
 * A shape can be rendered by providing a name or a shape descriptor.
 */
export type ShapeProps = {
	sides?: number
	rotation?: number
	cornerRadius?: number
	children?: ReactNode
	backgroundColor?: string
	className?: string
	style?: CSSPropertiesPlusVars
};

