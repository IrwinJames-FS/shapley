import { CSSable, PStyle } from "../types";

/**
 * The Diamond Grid props explain to the component how it should layout each cell.
 */
export type DiamondGridProps = {
	/**
	 * The number of columns in each row..
	 */
	columns: number
	/**
	 * If you already have a Diamond Geometry you can provide its id here if not one will be generated for you. It is recommended that the geometry be objectBounding and normalized to work properly.
	 */
	geometry?: string,

	/**
	 * The desired gap
	 */
	gap: CSSable | [CSSable, CSSable],

	/**
	 * If you provide a geometry property this will be ignored however this provides the opportunity to add a corner radius to the grid. Typically geometries are described as values between 0-1 as such your corner radius should be < the shortest sides intersecting at the vertex.
	 */
	cornerRadius?: number | number[]
} & PStyle