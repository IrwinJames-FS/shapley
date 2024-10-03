/*
This will be a place to store general use or utility types
*/

/**
 * @see (https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist)
 */
export type RequireOne<T, Keys extends keyof T> =
Pick<T, Exclude<keyof T, Keys>>
& {
	[K in Keys]-?:
		Required<Pick<T, K>>
		& Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]