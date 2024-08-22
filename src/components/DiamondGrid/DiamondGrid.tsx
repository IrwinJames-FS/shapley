import { ElementType, ReactNode } from "react";
import { PolyMorphic } from "../types";
import { DiamondGridProps } from "./types";
import ShapelyGrid from "../ShapelyGrid";
import { v4 } from "uuid";
import SVGCache from "../SVGCache";
import PolygonDefinition from "../PolygonDefinition";

const DiamondGrid = <T extends ElementType = "div">({
	as: el,
	geometry,
	cornerRadius,
	...props
}:PolyMorphic<DiamondGridProps, T>) => {
	let geo = geometry ?? '';
	let cache: ReactNode = undefined;
	if(!geometry){
		const id = v4();
		geo = '#'+id;
		cache = <SVGCache>
			
			<PolygonDefinition id={id} sides={4} cornerRadius={cornerRadius} objectBounding/>
		</SVGCache>

	}
	return (<>
		{cache}
		<ShapelyGrid {...{
			as: el || "div",
			cellSize: [2,2],
			columnCell: '1fr',
			columnSuffix: '1fr',
			aspectRatio: '1.1547 / 1',
			layout: (i, c) => {
				const x = i%c;
				const y = Math.floor(i/c);
				return [x, y*2+(1+x)%2, geo];
			},
			...props
		}}/>
	</>)
};

export default DiamondGrid;