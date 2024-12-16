import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

/**
 * Polymorphic Component contain the properties of the tagname its provided with.
 */
export type PolyMorphicProps<T extends ElementType, P = {}> = PropsWithChildren<P> & {
	as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof P | "as">;

/**
 * to make typing easier a CSSNumeric unit is automatically 
 */
export type CSSNumeric = number | string;