import { ComponentPropsWithoutRef, ElementType } from "react";

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

