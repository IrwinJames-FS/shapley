'use client';
import { FC, ReactNode, useEffect, useState } from "react"
import { DCacheItem } from "../../../geometry"
import { ShapeDefinition } from "../../ShapeDefinition";

export type NextShapeCacheClientProps = {
	shapes?: [string, DCacheItem][]
}
const CacheClient = ({shapes=[]}:NextShapeCacheClientProps): ReactNode=>{
	const [mounted, setMounted] = useState(false);
	useEffect(()=>setMounted(true), [setMounted]);
	return mounted ? (<div className="invisible"><svg className="shape-cache">
	<defs>
		{shapes.map(([k, shape])=>{
			return (<ShapeDefinition key={k} {...{
				id: k,
				d: ''+shape.d,
				clipPathUnits: shape.objectBounding ? 'objectBoundingBox':undefined
			}}/>)
		})}

	</defs>
</svg>
<style>
	{shapes.map(([k, shape])=>`.shapley-shape-${k}{
visibility: visible;
--shapley-clip: url(#${k}-clip);
--shapley-aspect-ratio: ${shape.aspectRatio};
}`)}
</style>
</div>):(<div className="invisible"></div>);
}
export default CacheClient;