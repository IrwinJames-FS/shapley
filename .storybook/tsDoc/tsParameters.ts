import { Node } from "ts-morph";

export const tsParameters = (node: Node): string => {
	const params = Node.isTypeParametered(node) ? node.getTypeParameters():[];
	if(!params.length) return '';
	return `&lt;${params.map(t=>t.getSymbol()?.getName() ?? '').join(', ')}&gt;`
}