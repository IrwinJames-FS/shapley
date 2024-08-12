import { ReactNode } from "react"

/**
 * All of the specialized Polgyon Grids accept these base properties.
 */
export type BaseShapelyGridProps = {
	children?: ReactNode
	rowSize?: number
	spacing?: CSSNumeric
	offset?: number
}

export type CSSNumeric = number | string

export type PStyle = {
	bgColor?: Hoverable<string>
	borderColor?: Hoverable<string>
	
	borderWidth?: Hoverable<CSSNumeric>
	shadow?: Hoverable<string>
}

/**
 * For now I want to support hover effects I will have to find a more extensible method as I add in more responsive controls.
 */
export type Hoverable<T> = T | [T, T];