import { FC } from "react";
import { GeometryDefinitionProps } from "./types";
import PathDefinition from "../PathDefinition";

/**
 * The GeometryDefinition is a specialized PathDefinition Component that uses the Points class to render a polygon using points or generator methods. 
 * @param props
 * @returns 
 */
const GeometryDefinition: FC<GeometryDefinitionProps> = ({geometry, ...props}) => (<PathDefinition d={''+geometry} {...props}/>);

export default GeometryDefinition;