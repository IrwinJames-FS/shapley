import { Point } from "./Point";

export type Pointish = Point | Array<number> | number

export type CommandGenerator = Generator<Point>

export type GeometryGenerator = ()=>CommandGenerator;

export type GeometryMutationGenerator = (gen: GeometryGenerator)=>GeometryGenerator