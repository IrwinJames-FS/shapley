import { CSSNumeric, PStyle } from "../types"

/**
 * The Hexagon grid comes in two flavors which is dictated by the horizontal boolean.
 */
export type HexagonGridProps = {
	/**
	 * The number of cells in each row
	 */
	columns: number

	/**
	 * The id for a geometry if one is already cached
	 */
	geometry?: string

	/**
	 * The desired corner radius if a hexagon needs to be generated
	 */
	cornerRadius?: number

	/**
	 * Should the horizontal variation be used.
	 * 
	 * If you are providing an id for a cached geometry you should update the geometry id to reflect a different hexagon (hint hint you only need to rotate a hexagon by 30 degrees to change what axis its represented on)
	 */
	horizontal?: boolean

	/**
	 * The distance between each cell
	 */
	gap?: CSSNumeric | [CSSNumeric | CSSNumeric]
} & PStyle