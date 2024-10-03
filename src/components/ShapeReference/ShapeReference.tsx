import { FC } from "react";
import { ShapeReferenceProps } from "./types";

export const ShapeReference: FC<ShapeReferenceProps> = ({
	href,
	components:{
		svg = {},
		use = {}
	} = {}
}) => (<svg {...svg}>
	<use href={href} {...use}/>
</svg>)