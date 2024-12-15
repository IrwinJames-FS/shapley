import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"
import { D } from "~/src/geometry"
import { ShapeDefinition } from "../ShapeDefinition/ShapeDefinition"
import './style.css';
export type ShapeGridProps = {
	/**
	 * The ds object will use the key as an id so the path command can be referenced from multiple components
	 */
	ds: Record<string, D>

	/**
	 * Cell columns will be the css value for cellTemplateColumns
	 */
	cellColumns: string

	/**
	 * Cell rows will the the css value for cellTemplateRows
	 */
	cellRows: string

	/**
	 * The size either needs to be set here or via css the assumed size is 1
	 */
	cellSize?: [number, number]
} & ComponentPropsWithoutRef<"div">
/**
 * The shape grid is responsible for laying out grid. positioning the cells and applying a reference type and aspect ratio
 * 
 */
export const ShapeGrid: FC<ShapeGridProps> = ({
	ds,
	className,
	children,
	cellColumns,
	cellRows,
	cellSize,
	style={},
	...props
})=>{
	//ensure all geometries are objectBounding
	Object.keys(ds).forEach(k=>ds[k].toObjectBounding());
	const aspectRatio = Object.values(ds)[0].aspectRatio;
	return (<div {...{
		className: [className ?? '', 'shapley-grid'].join(' ').trim(),
		style:{
			gridTemplateColumns: cellColumns,
			gridTemplateRows: cellRows,
			'--grid-aspect-ratio': aspectRatio,
			'--shape-height': cellSize ? cellSize[1]:undefined,
			'--shape-width': cellSize ? cellSize[0]:undefined,
			...style
		} as CSSProperties, //force recast back to CSSProperties it should parse just fine,
		...props
	}}>
		<svg>
			<defs>
				{Object.keys(ds).map(k=>{
					const d = ''+ds[k]
					console.log(d, ds[k].bounds)
					return <ShapeDefinition id={k} key={k} d={d}/>
				})}
			</defs>
		</svg>
		{children}
	</div>)
}