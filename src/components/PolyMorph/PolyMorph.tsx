import { ElementType } from "react";
import { PolyMorphProps } from "./types";

/**
 * PolyMorph is a simple tool to override the tagname and potentially use a custom component
 * @param param0 
 * @returns 
 */
const PolyMorph = <T extends ElementType = "div">({as, ...props}: PolyMorphProps<T>) => {
	const El = as || "div";
	return <El {...props}/>
}

export default PolyMorph