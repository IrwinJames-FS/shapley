import { ReactNode } from "react"

export type TriangleGridProps = {
	children?: ReactNode
	perRow?: number
	spacing?: number | string
}

export type TriangleGridCellProps = {
	children?: ReactNode
	row: number
	column: number
	spacing: string
}