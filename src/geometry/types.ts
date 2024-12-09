
export type Tuple<T, N extends number, R extends T[] = []> = N extends R['length'] ? R
: Tuple<T, N, [...R, T]>;

export type Point = [x: number, y: number];