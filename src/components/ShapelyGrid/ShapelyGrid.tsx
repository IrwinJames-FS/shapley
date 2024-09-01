import { Children, cloneElement, ElementType, isValidElement, ReactElement, ReactNode } from "react";
import { PolyMorphic } from "../types";
import { ShapelyGridProps } from "./types";
import { clsfy, standardizeValue, vars } from "../../utilities";
import './style.scss';
import Geometric from "../Geometric";

/**
 * This is the base level grid component. While the examples provided are to illustrate how this was used to build out higher level layouts this can require a lot of properties to work properly.
 */
const ShapelyGrid = <T extends ElementType="div">({
	as,
	className,
	columns,
	cellSize=[1,1],
	columnCell='1fr',
	columnPrefix,
	columnSuffix,
	clipPath,
	children,
	gap,
	aspectRatio='1/1',
	layout=i=>[i%columns, Math.floor(i/columns), ''],
	bgColor,
	borderColor,
	borderWidth,
	shadow,
	row: gridAutoRows,
	style={},
	...props
}:PolyMorphic<ShapelyGridProps, T>)=>{
	const El = as || "div";
	const gp = gap //if exists
	? ( //convert to array if its not already an array
		Array.isArray(gap) 
		? gap
		:[gap, gap]
	)
	//standardize the values with the default unit being px
	.map(v=>standardizeValue(v))
	//no gap in no gap out
	: undefined;
	//handle all geometries as an array.
	const gridTemplateColumns = `${columnPrefix ? columnPrefix+" ":""}repeat(${columns}, ${columnCell})${columnSuffix ? " "+columnSuffix:""}`;
	const els = Children.map(children, (child: ReactElement<{className:string, children: ReactNode}>, i)=>{
		const [column, row, t] = layout(i, columns);
		let c = child;
		if(isValidElement(child)){
			const {props:{children, className, ...props}} = child;
			c = cloneElement(child, {
				className: clsfy(className,'shapely-grid-cell'),
				children: <>
				<Geometric {...{src: t, bgColor, borderColor, borderWidth, shadow}} objectBounding/>
				{children}
				</>,
				...props
			});
		}
		return <div className="shapely-grid-cell-wrapper" style={{
			...vars({
				clipPath: `url(${t}-clip)`,
				column: column+1,
				row: row + 1,
				aspectRatio
			})
		}}>{c}</div>
	})
	return (<El {...{
	className: clsfy(className, 'shapely-grid'),
	style: {
		gridTemplateColumns,
		gridAutoRows,
		...vars({
			...(gp ? {
				columnGap: gp[0],
				rowGap: gp[1]
			}:{}),
			aspectRatio,
			columnSize: `${cellSize[0]}`,
			rowSize: `${cellSize[1]}`,
			clipPath,
			
		}),
		...style
	},
	...props
}}>	
{els}
</El>);
};

export default ShapelyGrid