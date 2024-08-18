import { ElementType } from "react";
import { PolyMorphic } from "../types";
import { ShapelyGridProps } from "./types";
import { clsfy, vars } from "../../utilities";
import './style.scss';

/**
 * This component can be a bit intense because it is doing quite a bit.
 * 
 * If you are unfamiliar with CSS grids I recommend you dig into them a bit because this component relies heavily on CSS grid.
 * 
 * You might notice that this system does not force any cell to be a shape. While a clip path can be placed it will be up to developer to use a Shapely component if they choose
 * 
 */
const ShapelyGrid = <T extends ElementType="div">({
	as,
	className,
	columns,
	cellSize=[1,1],
	columnCell='1fr',
	columnPrefix,
	columnSuffix,
	children,
	clipPath,
	aspectRatio='1/1',
	layout= i => ({gridColumnStart: (i%columns)+1+'', gridRowStart: Math.floor(i/columns)+1+''})
}:PolyMorphic<ShapelyGridProps, T>)=>{
	const El = as || "div";
	const gridTemplateColumns = `${columnPrefix ? columnPrefix+" ":""}repeat(${columns}, ${columnCell})${columnSuffix ? " "+columnSuffix:""}`;
	
	return (<El {...{
	className: clsfy(className, 'shapely-grid'),
	style: {
		gridTemplateColumns,
		...vars({
			aspectRatio,
			columnSize: `${cellSize[0]}`,
			rowSize: `${cellSize[1]}`,
			clipPath
		})
	}
}}>	
	{(Array.isArray(children) ? children:[children]).map((c,i)=><div className="shapely-grid-cell" key={i} style={layout(i, columns)}>{c}</div>)}
</El>);
};

export default ShapelyGrid