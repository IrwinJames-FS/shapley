
export type Tuple<T, N extends number, R extends T[] = []> = N extends R['length'] ? R
: Tuple<T, N, [...R, T]>;

export type Point = [x: number, y: number];

export type Bounds = [minX: number, minY: number, width: number, height: number, maxX: number, maxY: number];