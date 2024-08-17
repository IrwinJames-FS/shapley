import { ComponentPropsWithoutRef, ReactNode } from "react";

export type SVGCanvasProps = ComponentPropsWithoutRef<"svg"> & {
	defs?: ReactNode
};