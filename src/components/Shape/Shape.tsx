import { FC } from "react";
import { ShapeProps } from "./types";
import './style.scss';
const Shape: FC<ShapeProps> = () => (<h1 className="shapely-shape">Shape</h1>);

export default Shape;