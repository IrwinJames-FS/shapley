import { ComponentPropsWithoutRef } from "react";
import { PStyle } from "../types";

export type GeometryRefProps = Omit<ComponentPropsWithoutRef<"use">, "xlinkHref"> & Omit<PStyle, "shadow"> & {
	/**
	 * Unlink xlinkHref src is required and will populate both xlinkhref as well as clip path
	 */
	src?: string
}