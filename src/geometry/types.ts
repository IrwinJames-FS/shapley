import { Point } from "./Point";

/**
 * This generic reference accepts either a Point instance a number array or a singular number. 
 * If an array is provided that is empty or has only one value the missing x,y coordinates will be assumed to be 0 or 1 depending on the mathmatical operation. 
 * If a singular value is provided it will be used for both the x and y values.
 */
export type Pointish = Point | Array<number> | number

/**
 * The Command Generator used to be Called a Point generator however with command characters being applicable to the Point class it seems better here.
 */
export type CommandGenerator = Generator<Point>

/**
 * A geometry Generator is a reusable generator method. 
 * 
 * This will reinitialize the generator chain. one side effect that may or may not be desired is points can be directly mutated outside of ther generation iterator if declared statically using an array and the StaticPointGenerator.
 */
export type GeometryGenerator = ()=>CommandGenerator;

/**
 * Instead of applying a mutation at time of invocation this makes the calculation at the time of render as such reduces the number of times a series of points needs to be iterated over. 
 * 
 * This is a basic protocol to make a Generator that mutates existing points.
 */
export type GeometryMutationGenerator = (gen: GeometryGenerator)=>GeometryGenerator