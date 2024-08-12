import { ElementType } from "react";
import { PolyMorphic } from "../PolyMorph/types";
import { HexagonGridProps } from "./types";
import PolyGrid from "../PolyGrid/PolyGrid";
import { DEFAULT_ROW_SIZE } from "../constants";

const HexagonGrid = <T extends ElementType = "div">({
	as:el,
	...props
}:PolyMorphic<HexagonGridProps, T>) => (<PolyGrid {...{
	as: el || "div",
	shape: {
		sides: 6,
		
	},
	...props
}}/>);

export default HexagonGrid;