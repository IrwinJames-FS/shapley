import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"
import { D, DCache } from "../../geometry"
import './style.css';
import { ShapeCache } from "../ShapeCache";

export type ShapeGridProps = {
	/**
	 * The shapes object will use the key as an id so the path command can be referenced from multiple components
	 */
	shapes?: Record<string, D>

	/**
	 * Cell columns will be the css value for cellTemplateColumns
	 */
	cellColumns?: string

	/**
	 * Cell rows will the the css value for cellTemplateRows
	 */
	cellRows?: string

	/**
	 * The size either needs to be set here or via css the assumed size is 1
	 */
	cellSize?: [number, number]
} & ComponentPropsWithoutRef<"div">
/**
 * The shape grid is responsible for laying out grid. positioning the cells and applying a reference type and aspect ratio
 * 
 */
export const ShapeGrid: FC<ShapeGridProps> = ({
	shapes,
	className,
	children,
	cellColumns,
	cellRows,
	cellSize,
	style={},
	...props
})=>{
	return (<div {...{
		className: [className ?? '', 'shapley-grid'].join(' ').trim(),
		style:{
			gridTemplateColumns: cellColumns,
			gridTemplateRows: cellRows,
			'--shape-height': cellSize ? cellSize[1]:undefined,
			'--shape-width': cellSize ? cellSize[0]:undefined,
			...style
		} as CSSProperties, //force recast back to CSSProperties it should parse just fine,
		...props
	}}>
		{shapes && <ShapeCache shapes={shapes}/>} 
		{children}
	</div>)
}