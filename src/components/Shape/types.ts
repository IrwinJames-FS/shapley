import { ComponentPropsWithoutRef } from "react";
import { Geometry } from "~/geometry";

export type ShapeProps = {
	geometry?: Geometry
} & Omit<ComponentPropsWithoutRef<"path">, "d">