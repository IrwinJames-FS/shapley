import { ComponentProps, JSXElementConstructor, ReactNode } from "react";

/**
 * Supporting any element that reacts ComponentProps decorator supports.
 */
export type IntrinsicElement = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

export type PolyMorphProps<T extends IntrinsicElement> = ComponentProps<T> & {
	as?: T
};

export type PolyMorphic<P extends object = {}> = <T extends IntrinsicElement = "div">(props: PolyMorphProps<T> & P)=>ReactNode

