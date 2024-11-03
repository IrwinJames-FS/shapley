import { Node, SyntaxKind as SK, TypeAliasDeclaration } from "ts-morph";
import { TsBlock } from "./types";
import { TsBlockSection, TsBlockTitle } from "./Components";
import { tsSignature, tsSignatureFromTypeAlias } from "./tsSignature";
import { tsParameters } from "./tsParameters";


const SupportedDeclarations: Record<number, (node: Node) => TsBlock[]> = {
	[SK.TypeAliasDeclaration]: (node: Node) => {
		if(!Node.isTypeAliasDeclaration(node)) throw new Error("Type mismatch");
		const structure = node.getStructure();
		return [{
			link: '',
			content: TsBlockSection(
				TsBlockTitle(
					'type',
					structure.name,
					tsParameters(node),
					tsSignatureFromTypeAlias(node)
				)
			)
		}];
	},
}

export const tsBlocks = (node: Node): TsBlock[] => {
	const handler = SupportedDeclarations[node.getKind()]
	if(!handler) {
		console.log("Unsupported type", node.getKind(), node.getKindName());
		return []
	}
	return handler(node);
}