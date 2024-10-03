import { Point } from "./Point";

/**
 * A point at its core is just an array with two values as such it can be simulated with an array. 
 * 
 * As a convenience a scalar can be provided that 
 */
export type Pointish = number | number[] | Point;

export type GeometryGenerator = ()=>Generator<Point>;

export type GeometryMutator = (gen: GeometryGenerator)=>GeometryGenerator
