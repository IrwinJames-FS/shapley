import { ElementType } from "react";
import { PolyMorphProps } from "./types";

/**
 * PolyMorph is a simple tool to override the tagname and potentially use a custom component
 * 
 * This is more of a proof of concept because the final component should implement this logic. You are welcome to use this if you like however the types from this component will be utilized more then the component itself.
 * @param param0 
 * @returns 
 */
const PolyMorph = <T extends ElementType = "div">({as, ...props}: PolyMorphProps<T>) => {
	const El = as || "div";
	return <El {...props}/>
}

export default PolyMorph