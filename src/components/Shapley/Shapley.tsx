import { FC, isValidElement } from "react";
import { ShapleyProps } from "./types";
import { Geometry, psimd } from "~/geometry";

/**
 * Directly interface with Geometry classes.
 * 
 * @returns 
 */
export const Shapley:FC<ShapleyProps> = ({d, children, viewBox, ...props}) => {
	if(!viewBox && children){
		if(Array.isArray(children)){
		} else if (isValidElement(children)) {
			if('d' in children.props && typeof children.props.d === "string"){
				const [[mx, my], [Mx, My]] = new Geometry(children.props.d).bounds;
				viewBox = `${mx} ${my} ${Mx-mx} ${My-my}`;
			}
		}
	}
	return (<svg {...{
		viewBox,
		...props}}>
		{children}
	</svg>);
}