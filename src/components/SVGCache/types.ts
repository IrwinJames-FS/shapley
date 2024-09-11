import { ComponentPropsWithoutRef } from "react";

export type SVGCacheProps = ComponentPropsWithoutRef<"svg">;

export type PreviewRotations = [number, number, number, number, number, number];
/**
 * These properties are not part of the component
 * @private
 */
export type CachePreviewProps = {
	/**
	 * (Not part of component props)
	 */
	count: number,
	/**
	 * (Not part of component props)
	 */
	speeds: PreviewRotations
}