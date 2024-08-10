import { CSSProperties, ElementType } from "react";
import { clsfy, standardizeValue, vars } from "../../utilities";
import PolyMorph from "../PolyMorph/PolyMorph";
import { PolyMorphic, PolyMorphProps } from "../PolyMorph/types"
import './style.scss';
import { PolyGridProps } from "./types";
import Shape from "../Shape";

/**
 * The Polygrid will require a lot of setup however this will ultimately standardize grid handling and make the code more maintainable having a centralized layout controller. 
 * @param param0 
 * @returns 
 */
const PolyGrid = <T extends ElementType = "div", S extends ElementType = "div">({
	as,
	className,
	children,
	rowSize,
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
			gridTemplateColumns: `repeat(var(--row-size), ${gridCellTemplate ?? '1fr'})${gridRowSuffix ? ' '+gridRowSuffix:''}`,
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