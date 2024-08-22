import { FC } from "react";
import { Points, toRad } from "../../geometry";
import GeometryDefinition from "../GeometryDefinition";
import { PolygonDefinitionProps } from "./types";

const PolygonDefinition: FC<PolygonDefinitionProps> = ({sides=3, rotation=0, cornerRadius, ...props})=>(<GeometryDefinition {...{
	geometry: Points.fromCircle(sides, toRad(rotation))
	.round(cornerRadius ?? 0),
	...props
}}/>);

export default PolygonDefinition;