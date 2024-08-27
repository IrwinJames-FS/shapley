import { SyntaxKind } from "ts-morph"

export type TSDocNode = {
	id: string
	depth: number,
	kind: SyntaxKind
	decType: string
	name: string
	comment: string
	code: string
}

