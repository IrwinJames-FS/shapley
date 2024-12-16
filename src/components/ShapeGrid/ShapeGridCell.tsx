import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

export type ShapeGridCellProps = {
	/**
	 * Grid cells paths will always be references of some predefined shape the parent grid container should pass the necessary arguments to said component.
	 */
	bgRef?: string,
	column?: number,
	row?: number,
	fill?: string,
	stroke?: string,
	strokeWidth?: string,
	useProps?: Omit<ComponentPropsWithoutRef<"use">, "href">
} & ComponentPropsWithoutRef<"div">

export const ShapeGridCell:FC<ShapeGridCellProps> = ({
	bgRef,
	className,
	column,
	row,
	fill,
	stroke,
	strokeWidth,
	children,
	useProps = {},
	style={},
	...props
}) => {
	return <div {...{
		className: [className ?? '', 'shapley-grid-cell'].join(' ').trim(),
		style: {
			'--grid-column': column,
			'--grid-row': row,
			'--shape-clip': '#'+bgRef+'-clip',
			...style
		} as CSSProperties,
		...props
	}}>
		<svg viewBox="0 0 1 1" preserveAspectRatio="none">
			<use href={bgRef} {...{fill, stroke, strokeWidth, ...useProps}}/>
		</svg>
		{children}
	</div>
}