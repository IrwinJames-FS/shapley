import { ReactNode } from "react"

/**
 * All of the specialized Polgyon Grids accept these base properties.
 */
export type BaseShapelyGridProps = {
	children?: ReactNode
	rowSize?: number
	spacing?: number | string
	offset?: number
}