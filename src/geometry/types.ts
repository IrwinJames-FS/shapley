/**
 * The point is the most basic 2 dimension coordination on a cartesian plane.
 */

import Point from "./Point";
import RoundedCorner from "./RoundedCorner";

/**
 * The vector type is used to declare the 2 dimensional point along with an angle to use as a trajectory.
 */
export type Vector = [number, number, number];

/**
 * This is a min max rect where the first two numbers are the min coordinate and the last two numbers are the max coordinates in the rect.
 */
export type Rect = [Point, Point, Point];

export type Ngon = [
	string, //aspect ratio
	string, //the viewbox that will be used
	string, //path command for the background
]

export type VertexGenerator = ()=>Generator<Point | RoundedCorner>

/**
 * Really I just need the numeric values provided by the additional points all the math will be relative to the point the function is being called from. therefore I can simplify the process by not requiring a point be provided. this will reduce necessary new calls and Point instances. 
 */
export type SupportedPointMathTypes = Point | [number, number];