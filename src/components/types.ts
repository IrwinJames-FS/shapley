import { ReactNode, ComponentPropsWithoutRef, ElementType, CSSProperties } from "react"

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

type PathComponent = ComponentPropsWithoutRef<"use">
export type PStyle = Pick<PathComponent, "fill" | "stroke" | "strokeWidth"> & {shadow?: string};



export type PStyled = {
	pstyle?: PStyle
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

/**
 * Shapely Components Utilize this component to inherit parts of Inherited properties in a logical manner
 */
export type WithComponents<T extends object, C extends object> = T & ComponentsRecord<C>;


export type ComponentsRecord<T extends object> = {
	/**
	 * Components will be a record of prop overrides available.
	 */
	components?:T
}
