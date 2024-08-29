import { ReactNode, ComponentPropsWithoutRef, ElementType, CSSProperties } from "react"
import { Points } from "../geometry"

/**
 * Most components I expect this to be used with will be capable of being a parent unit... infact all components currently require that the children can be set. I may explore alternative that dont have this requirement later.
 * 
 */
export type PUnit = {
	children?:ReactNode
}

/**
 * All of the specialized Polgyon Grids accept these base properties.
 */
export type BaseShapelyGridProps = {
	children?: ReactNode
	rowSize?: number
	spacing?: CSSNumeric
	offset?: number
}

/**
 * CSSNumeric is the base types that CSS supports
 */
export type CSSNumeric = 
/**
 * Numbers are automatically converted to a px value
 */
number 
/**
 * Strings are treated with as raw css
 */
| string

export type PStyle = {
	bgColor?: Hoverable<string>
	borderColor?: Hoverable<string>
	borderWidth?: Hoverable<CSSNumeric>
	shadow?: Hoverable<string>
}


/**
 * For now I want to support hover effects I will have to find a more extensible method as I add in more responsive controls.
 */
export type Hoverable<T> = T | [T, T];

export type PolyMorphProps<T extends ElementType> = {
	as?: T
} & ComponentPropsWithoutRef<T>

/**
 * PolyMorphic is a type decorator to describe the properties of an overridable react component.
 * 
 * Providing a valid ElementType to the as property will allow a developer to override the root element of a component while still respecting linting rules in typescript.
 * 
 * as such the properties will be a combination of the root element type and the properties provided to P.
 */
export type PolyMorphic<P, T extends ElementType> = PolyMorphProps<T> & P;

export type CSSPropertiesPlusVars = CSSProperties & {
	[k: string]: CSSNumeric
}

export type Docked<T> = (props:T)=>ReactNode

export type GeometryDescriptor = {
	pathId?: string
	geometry?: Points
	objectBounding?: boolean
	aspectRatio?: string
	viewBox?: string
}