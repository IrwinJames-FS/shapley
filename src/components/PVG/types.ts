import { ComponentPropsWithoutRef } from "react";
import { PStyle } from "../types";

/**
 * The PVG is a design scheme that will either render based on external path definitions or based on a provided definition.
 * 
 * If the cached flag is provided as true then it will be assumed the xlinkHref has been provided. The clipPath url will be based on the id provided to the xlinkHref for now. 
 * If the cached flag is provided the clipPathProps will not be used neither will the path props.
 * 
 * 
 */
export type PVGProps = ComponentPropsWithoutRef<"use"> & {
	cached?: boolean
	pstyle?: PStyle
	components?: { //this disctinction is made to avoid name collisions.
		svg?: PVGSVGProps
		clipPath?: PVGClipPathProps
		path?: PVGPathProps
	}
}

export interface PVGSVGProps extends ComponentPropsWithoutRef<"svg"> {
	className?: string
}

export type PVGClipPathProps = Omit<ComponentPropsWithoutRef<"clipPath">, "id">

export type PVGPathProps = Omit<ComponentPropsWithoutRef<"path">, "d">

