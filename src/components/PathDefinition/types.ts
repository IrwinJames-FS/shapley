import { ComponentPropsWithoutRef } from "react";

export type PathDefinitionProps = ComponentPropsWithoutRef<"path"> & {
	noclip?: boolean
	id: string
	options?: {
		clipPath?: Omit<ComponentPropsWithoutRef<"clipPath">, "id">
	}
};

