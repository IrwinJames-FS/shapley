import { ComponentPropsWithoutRef, FC } from "react";

/**
 * For internal use.
 * This component standardizes the svg component and applies default aguments if necessary
 * @param param0 
 * @returns 
 */
const Svg: FC<ComponentPropsWithoutRef<"svg">> = ({...props})=>{
	return (<svg {...props}/>)
}