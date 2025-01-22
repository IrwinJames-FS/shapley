import { CSSProperties, FC, ReactNode } from "react"
import { Shape, ShapeProps } from "../Shape"

export type ShapeGridCellProps = {
	column?: number,
	row?: number,
} & ShapeProps

export const ShapeGridCell = ({
	sref,
	className,
	row,
	column,
	style={},
	children,
	...props
}: ShapeGridCellProps):ReactNode => {
	return <Shape {...{
		sref,
		className: [className ?? '', 'shapley-grid-cell'].join(' ').trim(),
		style: {
			'--grid-column': column,
			'--grid-row': row,
			...style
		} as CSSProperties,
		...props
	}}>{children}</Shape>
}