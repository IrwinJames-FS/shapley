import { JSDoc, Node, SyntaxKind as SK } from 'ts-morph';
import { getCode, getDecType, getName } from './parser';
import { $declaration } from './decorators';

class TsDocNode {
	node: Node
	kind: SK
	decType: string
	name: string
	jdoc: JSDoc[]
	tsCode: string
	constructor(node: Node){
		this.jdoc = Node.isJSDocable(node) ? node.getJsDocs():[];
		this.node = node;
		this.kind = node.getKind();
		this.decType = getDecType(this.kind);
		this.name = getName(node);
		this.tsCode = getCode(node);
	}

	get isClass() { return this.kind === SK.ClassDeclaration; }
	
	get header(){
		return `## ${$declaration`${this.decType}`} ${this.name}`
	}

	get comment(){
		return this.jdoc.map(j=>j.getComment()).join('\n');
	}

	get code() {
		return "```ts\n"+this.tsCode+"\n```";
	}

	toString(){
		
		return`${this.header}
${this.comment}

${this.code}`
	}
};

export default TsDocNode;