
/**
 * Path commands exist as generators of tuples. Instead of having specialize a CommandPath for the appropriate tuple size this allow tuples to be declared a bit more dynamically.
 */
export type Tuple<T, N extends number, R extends T[] = []> = N extends R['length'] ? R
: Tuple<T, N, [...R, T]>;

/**
 * Just a tuple representation of a two dimensional point.
 */
export type Point = [x: number, y: number];

/**
 * Bounds is a tuple that tracks the min point max point and bounding width of a path.
 */
export type Bounds = [minX: number, minY: number, width: number, height: number, maxX: number, maxY: number];