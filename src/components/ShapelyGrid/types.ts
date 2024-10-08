import { CSSNumeric, PStyle } from "../types"

/**
 * The Shapely Grid props are used to layout the items so they can be displayed appropriately
 */
export type ShapelyGridProps = {
	/**
	 * Aspect ratio is assumed to be 1/1 unless provided different. This is benefitial in preventing malshaped grid cells.
	 */
	aspectRatio?: string,

	/**
	 * The number of columns per row. 
	 */
	columns: number,

	/**
	 * This is the number of fractional units that dimension should span in gridRowEnd and gridColumnEnd.
	 */
	cellSize?: [number, number]

	/**
	 * This value is the representation of the cell width in fractional units this will be used within a repeat function to generate the columnTemplate
	 */
	columnCell?: string

	/**
	 * This property can be used to add a prefix before the repeat function
	 */
	columnPrefix?:string

	/**
	 * This property can be used to add a suffix after the repeat function
	 */
	columnSuffix?:string

	/**
	 * Because many of the cells bounding rectangles will overlap in a custom layout this can be used to clip the cells so they do not interfere with each others hover and click methods. 
	 */
	clipPath?: string

	/**
	 * The space between each cell
	 * This can be descibed as a single cell or as [column, row] spacing. This will help with having matching spacing when laying out shapes with an irregular aspect ratio
	 */
	gap?: CSSNumeric | [CSSNumeric, CSSNumeric]

	/**
	 * The layout function is used create a custom layout. if every cell is reliant on a single pathID the last argument in ShapelyGridLayoutFN tuple can be comitted.
	 */
	layout?: ShapelyGridLayoutFn

	/**
	 * This property provides an id to a cached shape 
	 */
	pathID?: string

	/**
	 * A pattern to be used in the row auto property
	 */
	row?: string
} & PStyle

/**
 * The Layout function is a method that provides the current index and column size.
 * 
 * the return method should return the [column, row, id?]
 * 
 * The id can be optional if only one geometry is used.
 */
export type ShapelyGridLayoutFn = (index: number, count: number) => [number, number] | [number, number, string]
	