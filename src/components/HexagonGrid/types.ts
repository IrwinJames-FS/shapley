import { CSSable, PStyle } from "../types"

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
	 */
	horizontal?: boolean

	/**
	 * The distance between each cell
	 */
	gap: CSSable | [CSSable | CSSable]
} & PStyle