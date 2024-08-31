export type TsNode = {
	id: string
	name?: string
	kind: string
	comment: string
	signature?: string
	code?: string
	depth: number
	src?: string
	optional: boolean
	generics?: string
	extension?: string
}