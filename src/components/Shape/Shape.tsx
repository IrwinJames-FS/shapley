import { ComponentPropsWithoutRef, ElementType, FC, PropsWithChildren } from "react";
import { D } from "~/geometry";
import './style.css';
import { v4 } from "uuid";

export type OverridableComponent<T extends ElementType = ElementType, Props = {}> = PropsWithChildren<Props> & {
	/**
	 * The shape components root element by default is a div however it can be updated to 
	 */
	as?: T
	/**
	 * d can be a string or an instance of D.
	 */
	d: D | string
	/**
	 * If clipped any overflow beyond the shape will be clipped
	 */
	clipped?: boolean
	pathProps?: Omit<ComponentPropsWithoutRef<"path">, "d">,
	useProps?: Omit<ComponentPropsWithoutRef<"use">, "href">,
	svgProps?: ComponentPropsWithoutRef<"svg">
} & Omit<ComponentPropsWithoutRef<T>, keyof Props | "as">


const Shape:FC<OverridableComponent> = ({as:Component = "div", d, clipped, className, children, svgProps:{viewBox, preserveAspectRatio, style:svgStyle, ...svgProps}={}, pathProps={}, useProps:{strokeWidth, ...useProps}={}, style={}, ...props})=>{
	const geo = typeof d === 'string' ? new D(d):d
	const cmds = ''+geo.toObjectBounding().setMargin(strokeWidth ? (typeof strokeWidth === 'string' ? parseFloat(strokeWidth):strokeWidth)/2:0);
	if(Math.max(...geo.bounds.slice(2,4)) > 1) console.warn("Shape paths should be within 0 and 1.");
	const id = v4();
	return (<Component {...{
		className: [className, 'shapley-shape'].filter(a=>a).join(' '),
		...props,
		style: {
			clipPath: clipped ? `url(#${id}-clip)`:undefined,
			aspectRatio: geo.aspectRatio,
			...style
		}
	}}>
		<svg {...{
			preserveAspectRatio: preserveAspectRatio ?? "none",
			viewBox: viewBox ?? geo?.viewBox,
			style: {
				aspectRatio: geo.aspectRatio,
				...svgStyle
			},
			...svgProps,

			}}>
			<defs>
				<path {...{id, d:cmds, ...pathProps}}/>
				<clipPath {...{id: id+'-clip', clipPathUnits:"objectBoundingBox"}}>
					<use href={"#"+id}/>
				</clipPath>
			</defs>
			<use href={"#"+id} {...{strokeWidth, ...useProps}}/>
		</svg>
		{children}
	</Component>);
}

export default Shape;