import { ComponentPropsWithoutRef } from "react"
import { Geometry } from "../../geometry"
import { RequireOne } from "../../types"
import { ShapeDefinitionComponents } from "../ShapeDefinition"

export type ShapeWithGeometryProps = {
	geometry: Geometry
	components?: ShapeComponents
}

export type ShapeWithHrefProps = {
	href: string
	viewBox: string
}

export type ShapeComponents = {
	svg?: Omit<ComponentPropsWithoutRef<"svg">, "children">
	use?: Omit<ComponentPropsWithoutRef<"use">, "href">
} & ShapeDefinitionComponents

export type BaseShapeProps = {
	id?: string
	geometry?: Geometry
	href?: string
	viewBox?: string
	components?: ShapeComponents
};

export type ShapeProps = RequireOne<BaseShapeProps, "geometry" | "href">