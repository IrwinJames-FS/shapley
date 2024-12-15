import { FC, ReactNode } from "react"
import { D } from "~/src/geometry"
import { ShapeDefinition } from "../ShapeDefinition"

export type ShapeCacheProps = {
	shapes: Record<string, D>
	allObjectBounding?: boolean
}

export const ShapeCache: FC<ShapeCacheProps> = ({shapes, allObjectBounding})=>{
	
	return <svg>
		<defs>
			{Object.keys(shapes).map(k=>{
				shapes[k].cache(k); //cache the shape as well.
				const isBounding = shapes[k].isObjectBounding;
				if(allObjectBounding && !isBounding) shapes[k].toObjectBounding();
				return (<ShapeDefinition key={k} {...{
					id: k,
					d: ''+shapes[k],
					clipPathUnits: shapes[k].isObjectBounding ? 'objectBoundingBox':undefined
				}}/>)
			})}
		</defs>
	</svg>
}