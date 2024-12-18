import { FC, ReactNode } from "react"
import { D } from "../../geometry"

import './style.css';
import { ShapeDefinition } from "../ShapeDefinition";


export type ShapeCacheProps = {
	shapes?: Record<string, D>
}

export const ShapeCache: FC<ShapeCacheProps> = async ({shapes={}})=>(<><svg className="shape-cache">
	<defs>
		{Object.entries(shapes).map(([k, shape])=>{
			return (<ShapeDefinition key={k} {...{
				id: k,
				d: ''+shape,
				clipPathUnits: shape.isObjectBounding ? 'objectBoundingBox':undefined
			}}/>)
		})}

	</defs>
</svg>
<style>
	{Object.entries(shapes).map(([k, shape])=>`.shapley-shape.shapley-shape-${k}{
visibility: visible;
clip-path: url(#${k}-clip);
--shapley-aspect-ratio: ${shape.aspectRatio};
}`)}
</style>
</>);