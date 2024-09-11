import { CSSNumeric } from "../types"

export type TriangleGridProps = {
	/**
	 * The number of columns to provide
	 */
	columns: number

	/**
	 * If you have already generated the triangle paths you want to use their Ids can be provided here
	 */
	geometries?: [string, string]

	/*
	This is only used if the geometries id is not provided
	*/
	cornerRadius?: number

	/**
	 * The gap to be used in the row and column gaps.
	 */
	gap?: CSSNumeric | [CSSNumeric, CSSNumeric]

	/**
	 * Render the horizontal variation of this grid.
	 */
	horizontal?: boolean
}