import { FC } from "react";
import { Points, toRad } from "../../geometry";
import GeometryDefinition from "../GeometryDefinition/GeometryDefinition";
import { PolygonDefinitionProps } from "./types";

const PolygonDefinition: FC<PolygonDefinitionProps> = ({sides=3, rotation=0, ...props})=>(<GeometryDefinition {...{
	geometry: Points.fromCircle(sides, toRad(rotation)),
	...props
}}/>);

export default PolygonDefinition;