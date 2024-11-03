import { NamedNode, Node, Symbol, Type, TypeAliasDeclaration, TypeNode } from "ts-morph";
import { Link, Span } from "./Components";
import { getName, getSource } from "./tsNode";
import { isPrimitive } from "./tsType";
import { KIND, OBJECT_LITERAL } from "./constants";

export const tsSignatureFromType = (type: Type): string => {
	if(isPrimitive(type)) return type.getText();
	return 'not supported';
}
/**
 * from what I can tell the typeNode is representative of everything after the colon however if union or or operators are used in the type declaration the node is unaware
 * @param node 
 * @returns 
 */
export const tsSignatureFromTypeNode = (node: TypeNode): string => {
	if(Node.isTypeReference(node)) {
		const name = node.getTypeName().getText();
		const args = node.getTypeArguments().map(tsSignatureFromTypeNode);
		const tArgs = args.length ? `&lt;${args.join(', ')}&gt;`:'';
		const href = getSource(node);
		return (href ? Link(KIND, href, name):Span(KIND, name))+tArgs;
	}
	if(Node.isNamedTupleMember(node)){
		const name = node.getName();
		const typeNode = node.getTypeNode();
		if(!typeNode) throw new Error("How can you have a name without a type in a tuple");
		return Span(KIND, name)+': ' + tsSignatureFromTypeNode(typeNode);
	}
	if(Node.isTupleTypeNode(node)) {
		return `[${node.getElements().map(tsSignatureFromTypeNode).join(', ')}]`;
		
	}
	if(Node.isUnionTypeNode(node)) {
		return node.getTypeNodes().map(tsSignatureFromTypeNode).join(' | ');
	}
	if(Node.isIntersectionTypeNode(node)){
		return node.getTypeNodes().map(tsSignatureFromTypeNode).join(' & ');
	}
	if(Node.isArrayTypeNode(node)){
		return tsSignatureFromTypeNode(node.getElementTypeNode()) + '[]';
		
	}
	//handle known keywords
	if(Node.isAnyKeyword(node) || Node.isInferKeyword(node) || Node.isNeverKeyword(node) || Node.isNumberKeyword(node) || Node.isObjectKeyword(node) || Node.isStringKeyword(node) || Node.isSymbolKeyword(node) || Node.isBooleanKeyword(node) || Node.isUndefinedKeyword(node)) return Span(KIND, node.getText());
	//not going to render object literals into a signature
	if(Node.isObjectLiteralExpression(node) || Node.isTypeLiteral(node)) return Span(KIND, OBJECT_LITERAL);
	return tsSignatureFromType(node.getType());
}

export const tsSignatureFromTypeAlias = (node: TypeAliasDeclaration): string => {
	const typeNode = node.getTypeNode();
	if(!typeNode) return '';
	const t = tsSignatureFromTypeNode(typeNode);
	return t ? ': '+t:'';
}


export const tsSignature = (node: Node): string => {
	const nodeName = getName(node);

	if(Node.isTypeAliasDeclaration(node)) return tsSignatureFromTypeAlias(node);
	return '';
};