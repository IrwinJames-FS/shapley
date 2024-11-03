import { Point } from "./Point";

/**
 * If a number is provided the value will be used as both x and y in the operation.
 * 
 * If an array is provided it must have at least two values. 
 * Both arrays and Point instances are treated the same. the first value represents x and the second y.
 */
export type Pointish = number | [number, number] | Point;