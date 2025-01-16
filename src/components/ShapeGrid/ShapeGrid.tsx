import { Children, cloneElement, ComponentPropsWithoutRef, CSSProperties, FC, isValidElement, ReactElement, ReactNode, Fragment } from "react"
import { D, DCache } from "../../geometry"
import './style.css';
import { ShapeCache } from "../ShapeCache";
import { ShapeGridCellProps } from "./ShapeGridCell";
import { isFragment, isTransitionalElement } from "../../utils";

export interface ShapeGridLayoutDescriptor {
	/**
	 * This value is used in the grid-row property starting from 1 and ranging to the number of necessary rows.
	 */
	row: number
	
	/**
	 * This value is used in the grid-column property starting from 1 and gangine to the number of necesssary rows.
	 */
	column: number

	/**
	 * In some cases the path used to clip the shape may vary depending on where in the grid a shape will appear.
	 */
	sref?: string
}

export type ShapeGridLayoutFn = (index:number) => ShapeGridLayoutDescriptor

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
	 * The number of rows and columns the shape will occupy within the grid. 
	 */
	cellSize?: [columns: number, rows: number]

	/**
	 * In most cases grid layout should be automated. This function provides an interface to generate positioning information for each cell.
	 * If this method is not provided each cell will need to be placed manually using the --grid-row and --grid-column variables.
	 * @param index 
	 * @returns 
	 */
	layoutFn?: ShapeGridLayoutFn
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
	layoutFn,
	style={},
	...props
})=>{

	if(shapes) Object.values(shapes).forEach(s=>s.toObjectBounding());
	let o = 0;
	const childify = (childs: ReactNode):ReactNode=> {
		if(!layoutFn) return childs;
		return Children.map(childs, (child)=>{
			
			if(!isTransitionalElement(child)) return child;
			if(isFragment(child)) {
				const childChildren = (child as ReactElement<{children: ReactNode}>).props.children
				return cloneElement(child as ReactElement<{children: ReactNode}>, {children: childify(childChildren)})
			}
			const i = o++;
			const {row, column, sref} = layoutFn(i);
			return cloneElement(child as ReactElement<ShapeGridCellProps>, {sref, style:{
				'--grid-row': row,
				'--grid-column': column,
				...(child as ReactElement<{style?: CSSProperties}>)?.props?.style
			}})
		})
	}
	o=0;
	const childs = childify(children);
	
	return (<>
	<div {...{
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
		{childs}
	</div>
	
	</>)
}