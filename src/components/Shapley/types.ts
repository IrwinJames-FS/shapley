import { ComponentPropsWithoutRef } from "react"
import { ShapleyStyles } from "~/components/types"
import { Geometry } from "~/geometry"

export type ShapleyProps = {
	d: string
} & ComponentPropsWithoutRef<"svg">