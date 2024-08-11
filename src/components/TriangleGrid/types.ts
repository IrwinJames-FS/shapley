import { ReactNode } from "react"

export type TriangleGridProps = {
	children?: ReactNode
	rowSize?: number
	spacing?: number | string
	offset?: number
	horizontal?: boolean
}