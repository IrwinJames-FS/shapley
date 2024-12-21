import { CSSProperties, FC } from "react"
import { Shape, ShapeProps } from "../Shape"

export type ShapeGridCellProps = {
	column?: number,
	row?: number,
} & ShapeProps

export const ShapeGridCell:FC<ShapeGridCellProps> = ({
	sref,
	className,
	row,
	column,
	style={},
	children,
	...props
}) => {
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