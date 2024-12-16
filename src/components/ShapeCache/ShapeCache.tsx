import { FC, ReactNode } from "react"
import { D } from "~/src/geometry"
import { ShapeDefinition } from "../ShapeDefinition"

export type ShapeCacheProps = {
	shapes: Record<string, D>
}

export const ShapeCache: FC<ShapeCacheProps> = ({shapes})=>{
	Object.entries(shapes).forEach(([k, d])=>d.cache(k));
	return <svg className="shape-cache">
		<defs>
			{Object.keys(shapes).map(k=>{
				return (<ShapeDefinition key={k} {...{
					id: k,
					d: ''+shapes[k],
					clipPathUnits: shapes[k].isObjectBounding ? 'objectBoundingBox':undefined
				}}/>)
			})}
		</defs>
	</svg>
}