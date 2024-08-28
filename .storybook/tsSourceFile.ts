import { Node, SourceFile, SyntaxKind as SK, ScriptTarget, ScriptKind, NameableNode } from "ts-morph";
import { __src, __docs } from "./constants";
import { $code, $dec, $h } from "./tsDecs";
import { TSDocNode } from "./types";
import { createPrinter, createSourceFile } from "typescript";
import fs from 'fs';
import path from "path";


export class tsSourceFile {
	file: SourceFile
	blocks: TSDocNode[] = []
	refs: Record<string, number> = {}

	get relativePath(){ return this.file.getFilePath().replace(__src+'/', '') }
	get title(){return this.file.getFilePath().replace(__src+'/', '').slice(0, -3);}
	get docPath(){return this.title.replace(/\//g, '.')+'.mdx';}

	get doc(){
		return this.renderSource(this.file);
	}
	constructor(file: SourceFile){
		this.file = file;
	}

	toString(){
		const doc = this.doc;

		return doc ? `import { Meta } from '@storybook/blocks';

<Meta title="${this.title}" />

${doc}
`:'';
	}

	renderSource(node: Node){
		
		node.forEachChild(n => {
			this.getNode(n);
		});
		return this.blocks.reduce((o,v)=>o+this.renderNode(v)+'\n','')
	}

	getNode(node: Node) {
		const tnode = tsnode(node);
		if(!tnode) return;
		const ri = this.refs[tnode.id] ?? -1;
		if(~ri){
			const block = this.blocks[ri];
			block.decType += ' ' + tnode.decType;
			block.comment += '\n' + tnode.comment;
		} else {
			this.refs[tnode.id] = this.blocks.length;
			this.blocks.push(tnode);
			if(tnode.kind === SK.ClassDeclaration) node.forEachChild(this.getNode.bind(this));
		}
	}

	renderNode({decType, name, comment, code, kind, depth}: TSDocNode):string {
		return $dec`${decType}`+`
		${$h(depth, name)}

		${comment}

		${kind === SK.ClassDeclaration ? '':$code(code)}
		`;
	}

	save(){
		const doc = this.toString();
		if(!doc) return false;
		fs.writeFileSync(path.join(__docs, this.docPath), doc);
		return true;
	}
}

const tsnode = (node: Node):TSDocNode | undefined => {
	const kind = node.getKind();
	const name = tsname(node);
	const decType = tskind(kind);
	if(decType === undefined) {
		return undefined; //unsupported kind
	}
	return {
		...tsid(node),
		kind,
		decType,
		name,
		comment:tscomment(node),
		code: tscode(node)
	} 	
}

const tsid = (node: Node):{id: string, depth: number} => {
	let el: Node | undefined = node;
	const ids: string[] = [];
	while (el) {
		ids.unshift(tsname(node));
		el = el.getParent();
	}
	return {id:ids.join('.'), depth: ids.length};
}
const tskind = (kind: SK): string | undefined => {
	switch(kind){
		case SK.TypeAliasDeclaration: return "type";
		case SK.InterfaceDeclaration: return "interface";
		case SK.VariableDeclaration: return "const";
		case SK.FunctionDeclaration:
		case SK.ArrowFunction: return "function";
		case SK.ClassDeclaration: return "class";
		case SK.EnumDeclaration: return "enum";
		case SK.MethodDeclaration: return "method";
		case SK.GetAccessor: return "get";
		case SK.SetAccessor: return "set";
		case SK.PropertyDeclaration: return "";

	}
	return undefined;
}

const tsname = (node: Node):string => {
	return ('getName' in node) ? (node as unknown as NameableNode).getName() ?? "default":"default"
}

const tscomment = (node: Node) => (Node.isJSDocable(node) ? node.getJsDocs():[]).reduce((o,v)=>o+v.getComment()+'\n', '');
const tscode = (node: Node):string => {
	const code = node.getText();
	return (Node.isMethodDeclaration(node) || Node.isGetAccessorDeclaration(node) || Node.isSetAccessorDeclaration(node))
	? tsprint(code, "class{%}")
	: tsprint(code)
}

const tsprint = (value: string, wrap?:string) => {
	const printer = createPrinter({removeComments: true});
	if(wrap){
		const [prefix, suffix] = wrap.split("%");
		return printer
		.printFile(createSourceFile('tempt.ts', prefix+value+suffix, ScriptTarget.Latest, true, ScriptKind.TS))
		.slice(prefix.length+1, -suffix.length-1)
		.trim()
		.replace(/\n\s{4}/g, '\n');
	}
	return printer
	.printFile(createSourceFile('tempt.ts', value, ScriptTarget.Latest, true, ScriptKind.TS));
}
