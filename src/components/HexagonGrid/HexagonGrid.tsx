import { ElementType, ReactNode } from "react";
import { PolyMorphic } from "../types";
import { HexagonGridProps } from "./types";
import ShapelyGrid from "../ShapelyGrid";
import { v4 } from "uuid";
import SVGCache from "../SVGCache";
import PolygonDefinition from "../PolygonDefinition";

const HexagonGrid = <T extends ElementType = "div">({
	as: el,
	geometry,
	cornerRadius,
	horizontal,
	...props
}:PolyMorphic<HexagonGridProps, T>) => {
	let geo = geometry ?? '';
	let cache: ReactNode = undefined;
	if(!geometry){
		const id = v4();
		geo = '#'+id;
		cache = <SVGCache>
			
			<PolygonDefinition id={id} sides={6} rotation={horizontal ? 30:0} cornerRadius={cornerRadius} objectBounding/>
		</SVGCache>

	}
	return (<>
		{cache}
		<ShapelyGrid {...{
			as: el || "div",
			cellSize: horizontal ? [3,2]:[2,3],
			columnCell: horizontal ? '1fr 2fr':'1fr',
			columnSuffix: '1fr',
			aspectRatio: '1.1547 / 1',
			row: horizontal ? '1fr' : '1fr 2fr',
			layout: (i, c) => {
				const x = i%c;
				const y = Math.floor(i/c);
				return horizontal 
				? [x*2, y*2+((1+x)%2), geo]
				: [x, y*4+(((1+x)%2)*2), geo];
			},
			...props
		}}/>
	</>)
};

export default HexagonGrid;