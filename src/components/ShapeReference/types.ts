import { ComponentPropsWithoutRef } from "react"

export type ShapeReferenceProps = {
	href: string
	components?: {
		svg?: Omit<ComponentPropsWithoutRef<"svg">, "children">
		use?: Omit<ComponentPropsWithoutRef<"use">, "d" | "href">
	}
}