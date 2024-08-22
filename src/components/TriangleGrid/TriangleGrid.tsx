import { ElementType, ReactNode } from "react";
import { PolyMorphic } from "../types";
import { TriangleGridProps } from "./types";
import ShapelyGrid from "../ShapelyGrid/ShapelyGrid";
import { v4 } from "uuid";
import SVGCache from "../SVGCache/SVGCache";
import PolygonDefinition from "../PolygonDefinition";

const TriangleGrid = <T extends ElementType = "div">({
	as: el,
	geometries,
	cornerRadius,
	horizontal,
	...props
}: PolyMorphic<TriangleGridProps, T>) => {
	let geos = geometries;
	let cache: ReactNode = undefined;
	if(!geometries) {
		const id = v4();
		geos = [`#${id}-even`, `#${id}-odd`];
		cache = <SVGCache>
			<PolygonDefinition id={id+'-even'} sides={3} rotation={horizontal ? -90:180} cornerRadius={cornerRadius} objectBounding />
			<PolygonDefinition id={id+'-odd'} sides={3} rotation={horizontal ? 90:0} cornerRadius={cornerRadius} objectBounding/>
		</SVGCache>
	}
	const [even, odd] = geos!;
	return (<>
	{cache}
	<ShapelyGrid {...{
		as: el || "div",
		cellSize: horizontal ? [1,2]:[2, 1],
		columnCell: '1fr',
		columnSuffix: '1fr',
		aspectRatio: '1.1547 / 1',
		layout: (i, c) => {
			const x = i%c;
			const y = Math.floor(i/c)
			return [x, y, (x+y)%2 ? odd:even];
		},
		...props
	}}/>
	</>);
}

export default TriangleGrid;