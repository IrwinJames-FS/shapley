import { FC, ReactNode } from "react"
import { D, DCache } from "../../geometry"
import { ShapeDefinition } from "../ShapeDefinition"

import './style.css';
import { ShapeCacheHydrator } from "./ShapeCacheHydrator";

export type ShapeCacheProps = {
	shapes?: Record<string, D>
	cache?: DCache
}

export const ShapeCache: FC<ShapeCacheProps> = ({shapes={}, cache={}})=>{
	Object.entries(shapes).forEach(([k, d])=>d.cache(k));
	return (<>
	<svg className="shape-cache">
		<defs>
			{Object.keys(cache).map(k=>{
				return (<ShapeDefinition key={k} {...{
					id: k,
					d: ''+cache[k].d,
					clipPathUnits: cache[k].viewBox === '0 0 1 1' ? 'objectBoundingBox':undefined
				}}/>)
			})}
			{Object.keys(shapes).map(k=>{
				return (<ShapeDefinition key={k} {...{
					id: k,
					d: ''+shapes[k],
					clipPathUnits: shapes[k].isObjectBounding ? 'objectBoundingBox':undefined
				}}/>)
			})}

		</defs>
	</svg>
	{/* create a json object to be passed to client side if running from server side initially */}
	<ShapeCacheHydrator cache={D.cache}/> 
	</>)
}