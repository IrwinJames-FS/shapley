import { FC } from "react";
import { PolygonicProps } from "./types";
import Geometric from "../Geometric";
import { Points, toRad } from "../../geometry";

/**
 * Polygonic builds a Geometric based on its sides and rotation properties.
 * @param param0 
 * @returns 
 */
const Polygonic: FC<PolygonicProps> = ({
	sides=3,
	rotation=0,
	cornerRadius=0,
	...props
}) => (<Geometric {...{
	geometry: Points.fromCircle(sides, toRad(rotation))
	.round(cornerRadius),
	...props
}}/>);

export default Polygonic;