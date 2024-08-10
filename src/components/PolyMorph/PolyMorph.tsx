import { PolyMorphic } from "./types";

/**
 * PolyMorph is a simple tool to override the tagname and potentially use a custom component
 * @param param0 
 * @returns 
 */
const PolyMorph: PolyMorphic = ({as = "div", ...props}) => {
	const El = as || "div";
	return <El {...props}/>
}

export default PolyMorph