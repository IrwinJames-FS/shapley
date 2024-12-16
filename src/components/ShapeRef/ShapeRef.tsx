import { ComponentPropsWithoutRef, ElementType, FC } from "react"
import { PolyMorphicProps } from "../types"
import { mergeClasses } from "~/src/utils"
import { D } from "~/src/geometry"

export type ShapeRefProps<T extends ElementType = ElementType> = PolyMorphicProps<T, {
	/**
	 * The name of the shape to be referenced. dont prefix this with an #. does not support external referencing... for now.
	 */
	sref: string,

	fill?: string,
	stroke?: string,
	strokeWidth?: number,
	svgProps?: ComponentPropsWithoutRef<"svg">
	useProps?: Omit<ComponentPropsWithoutRef<"use">, "href">
}>

export const ShapeRef:FC<ShapeRefProps> = ({
	as: Component = "div", 
	sref, 
	fill, 
	stroke,
	strokeWidth,
	className, 
	children, 
	svgProps:{
		style:svgStyle={}, 
		...svgProps
	} = {},
	useProps = {},
	 ...props}) => {
	const d = D.cache[sref];
	if(!d) return;
	return <Component {...{
		className: mergeClasses(className)`shapley-shape`,
		...props}}>
			<svg {...{
				preserveAspectRatio: "none",
				viewBox: d.viewBox,
				style: {
					aspectRatio: d.aspectRatio,
					...svgStyle
				},
				...svgProps //should overwrite any flat values
			}}>
				<use {...{
					href: '#'+sref,
					fill,
					stroke,
					strokeWidth,
					...useProps
				}}/>
			</svg>
			{children}
	</Component>
}