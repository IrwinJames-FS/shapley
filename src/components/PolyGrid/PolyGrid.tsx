import { CSSProperties, ElementType } from "react";
import { clsfy, standardizeValue, vars } from "../../utilities";
import PolyMorph from "../PolyMorph/PolyMorph";
import { PolyMorphic, PolyMorphProps } from "../PolyMorph/types"
import './style.scss';
import { PolyGridProps } from "./types";
import Shape from "../Shape";
import { DEFAULT_ROW_SIZE } from "../constants";

/**
 * PolyGrid is a generic layout system that provides an iterator so items can be placed in a grid system. 
 * 
 * This is utilizing css grids to layout the content.
 * @param param0 
 * @returns 
 */
const PolyGrid = <T extends ElementType = "div", S extends ElementType = "div">({
	as,
	className,
	children,
	rowSize=DEFAULT_ROW_SIZE,
	rowSizeTransformer = n=>n,
	layout = i=>({style:{gridColumnStart: (i%rowSize)+1, gridRowStart: Math.floor(i/rowSize)+1}}),
	shape,
	style,
	gridCellTemplate,
	gridRowTemplate,
	gridRowSuffix,
	gridCellSize: [cellWidth, cellHeight] = [undefined, undefined],
	spacing,
	...props
}: PolyMorphic<PolyGridProps<S>, T>) => {
	
	const El = as || "div";
	const cellSpacing = standardizeValue(spacing);

	return (<El {...{
		className: clsfy(className, "shapely-poly-grid"),
		style: {
			gridTemplateColumns: (gridCellTemplate || gridRowSuffix) ? `repeat(var(--row-size), ${gridCellTemplate ?? '1fr'})${gridRowSuffix ? ' '+gridRowSuffix:''}`:undefined,
			...vars({
				rowSize: rowSizeTransformer(rowSize),
				cellWidth: cellWidth ? "span "+cellWidth:undefined,
				cellHeight: cellHeight ? "span "+cellHeight:undefined,
				cellSpacing,
				gridRowTemplate
			}),
			
		} as CSSProperties,
		...props
	}}>{children && (Array.isArray(children) ? children:[children]).map((c,i)=>{
		const {style={}, shape:shapeProps={}} = layout(i, rowSize);
		return (<div className="shapely-poly-grid-cell" key={i} {...{style}}>
			<Shape {...{...shape, ...shapeProps}}>
				{c}
			</Shape>
		</div>);
	})}</El>);
}

export default PolyGrid;