import { SyntaxKind as SK, Node, NameableNode } from "ts-morph";
import { createPrinter, createSourceFile, ScriptTarget, ScriptKind } from "typescript";

export const getDecType = (kind: SK) => {
	switch (kind){
		case SK.FunctionDeclaration:
		case SK.FunctionExpression:
		case SK.ArrowFunction: return 'function'
		case SK.VariableDeclaration:
		case SK.VariableStatement: return 'const';
		case SK.ClassDeclaration:
		case SK.ClassExpression: return 'class';
		case SK.TypeAliasDeclaration: return 'type';
		case SK.InterfaceDeclaration: return 'interface';
		case SK.EnumDeclaration: return 'enum';
		case SK.ExportDeclaration: return 'export';
		case SK.ExportAssignment: return 'export';
	}
	return '';
}

export const getName = (node: Node) => {
	if(Node.isVariableStatement(node)) return node.getDeclarations()[0]?.getName() ?? "default";
	return ('getName' in node) ? (node as unknown as NameableNode).getName() ?? "default":"default";
}

export const getCode = (node: Node) => {
	const isMethod = Node.isMethodDeclaration(node) || Node.isPropertyDeclaration(node) || Node.isGetAccessorDeclaration(node) || Node.isSetAccessorDeclaration(node) || Node.isConstructorDeclaration(node);
	const printer = createPrinter({removeComments: true});
	const source = createSourceFile('temp.ts', isMethod ? `class {${node.getText()}}`:node.getText(), ScriptTarget.Latest, true, ScriptKind.TS);
	return isMethod ? printer.printFile(source).replace('class {', '').replace(/}\s*$/, '').replace(/\n\s{4}/g, '\n'):printer.printFile(source);
}

