import { ComponentProps, ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, JSXElementConstructor, ReactNode } from "react";

/**
 * Supporting any element that reacts ComponentProps decorator supports.
 */


export type PolyMorphProps<T extends ElementType> = {
	as?: T
} & ComponentPropsWithoutRef<T>

export type PolyMorphic<P, T extends ElementType> = PolyMorphProps<T> & P;

