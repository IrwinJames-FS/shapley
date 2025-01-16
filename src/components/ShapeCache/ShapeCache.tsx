import { FC, ReactNode } from "react"
import { D } from "../../geometry"

import './style.css';
import { ShapeDefinition } from "../ShapeDefinition";


export type ShapeCacheProps = {
	shapes?: Record<string, D>
}

export const ShapeCache: FC<ShapeCacheProps> = ({shapes={}})=>(<><svg className="shape-cache">
	<defs>
		{Object.entries(shapes).map(([k, shape])=>{
			return (<ShapeDefinition key={k} {...{
				id: k,
				d: ''+(shape.isObjectBounding ? shape:shape.toObjectBounding()),
				clipPathUnits: 'objectBoundingBox'
			}}/>)
		})}
	</defs>
</svg>
<style>
	{Object.entries(shapes).map(([k, shape])=>`
:root{
	--shapley-${k}-aspect-ratio: ${shape.aspectRatio}
}
.shapley-shape.shapley-shape-${k}{
	visibility: visible;
	--shapley-clip: url(#${k}-clip);
	--shapley-aspect-ratio: ${shape.aspectRatio};
}`)}
</style>
</>);