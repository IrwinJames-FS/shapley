import { FC } from "react";
import { PolygonsProps } from "./types";
import Polygon from "./Polygon";

export const Triangle: FC<PolygonsProps> = props => <Polygon sides={3} {...props}/>;

export const Diamond: FC<PolygonsProps> = props => <Polygon sides={4} {...props}/>;

export const Pentagon: FC<PolygonsProps> = props => <Polygon sides={5} {...props}/>;

export const Hexagon: FC<PolygonsProps> = props => <Polygon sides={6} {...props}/>;

export const Heptagon: FC<PolygonsProps> = props => <Polygon sides={7} {...props}/>;

export const Octagon: FC<PolygonsProps> = props => <Polygon sides={8} {...props}/>;