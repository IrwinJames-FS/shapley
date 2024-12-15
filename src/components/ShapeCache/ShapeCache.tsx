import { FC, ReactNode } from "react"
import { D } from "~/src/geometry"

export type ShapeCacheProps = {
	children?: ReactNode
}

export const ShapeCache: FC<ShapeCacheProps> ({children})=><svg></svg>