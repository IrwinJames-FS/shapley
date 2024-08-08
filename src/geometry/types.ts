/**
 * The point is the most basic 2 dimension coordination on a cartesian plane.
 */
export type Point = [number, number];

/**
 * The vector type is used to declare the 2 dimensional point along with an angle to use as a trajectory.
 */
export type Vector = [number, number, number];

/**
 * This is a min max rect where the first two numbers are the min coordinate and the last two numbers are the max coordinates in the rect.
 */
export type Rect = [number, number, number, number];

export type Ngon = [
	number, //aspect ratio
	string, //path command for the background
]