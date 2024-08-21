import { Children, ElementType } from "react";
import { PolyMorphic } from "../types";
import { ShapelyGridCellProps } from "./types";
import { clsfy, vars } from "../../utilities";
import Geometry from "../Geometry/Geometry";

const ShapelyGridCell = <T extends ElementType="div">({
	as:el,
	className,
	row,
	column,
	src,
	aspectRatio,
	children,
	...props
}:PolyMorphic<ShapelyGridCellProps, T>)=>{
	return <div {...{
		className:  "shapely-grid-cell-wrapper",
		style: {
			...vars({
				row: row+1,
				column: column+1,
				clipPath: `url(${src}-clip)`,
				aspectRatio
			}),
			
		},
		
	}}>
		<Geometry {...{
			className:clsfy(className, "shapely-grid-cell"),
			as: el || "div",
			pathId: src,
			...props
		}}>{children}</Geometry>
	</div>
};

export default ShapelyGridCell;