import { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * The SVG canvas is simply a custom SVG element designed to simplify visually representing information.
 * 
 * Because canvas' can display and cache information it accepts defs as a property which is just an alias to the &lt;defs&gt;
 */
export type SVGCanvasProps = ComponentPropsWithoutRef<"svg"> & {

	/**
	 * Simply an alias to an internal &lt;defs&gt; 
	 */
	defs?: ReactNode
};