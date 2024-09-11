import { ElementType } from "react";
import { PolygonsProps } from "./types";
import Polygon from "./Polygon";
import { PolyMorphic } from "../types";

export const Triangle = <T extends ElementType="div">({as, ...props}:PolyMorphic<PolygonsProps, T>) => <Polygon as={as || "div"} sides={3} {...props}/>;

export const Diamond = <T extends ElementType="div">({as, ...props}:PolyMorphic<PolygonsProps, T>) => <Polygon as={as || "div"} sides={4} {...props}/>;

export const Pentagon = <T extends ElementType="div">({as, ...props}:PolyMorphic<PolygonsProps, T>) => <Polygon as={as || "div"} sides={5} {...props}/>;

export const Hexagon = <T extends ElementType="div">({as, ...props}:PolyMorphic<PolygonsProps, T>) => <Polygon as={as || "div"} sides={6} {...props}/>;

export const Heptagon = <T extends ElementType="div">({as, ...props}:PolyMorphic<PolygonsProps, T>) => <Polygon as={as || "div"} sides={7} {...props}/>;

export const Octagon = <T extends ElementType="div">({as, ...props}:PolyMorphic<PolygonsProps, T>) => <Polygon as={as || "div"} sides={8} {...props}/>;