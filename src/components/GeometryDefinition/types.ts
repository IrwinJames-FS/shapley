import { ComponentPropsWithoutRef } from "react";
import { Geometry } from "../../geometry";

export type GeometryDefinitionProps = {
	id: string
	geometry: Geometry,
	components?: {
		path?: Omit<ComponentPropsWithoutRef<"path">, "id" | "d">,
		clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "id">
	}
};