import { Node } from "ts-morph";
import { TsNode } from "./types";
import { tsNode, tsTypeProperty } from "./tsNode";

/**
 * Warning this is for a specific purpose I will not be supporting removal so indices will not update
 */
class tsNodeList extends Array<TsNode> {
	indices: Record<string, number> = {}
	constructor(){
		super();
	}

	add(node: Node, depth: number=0){
		const n = tsNode(node, depth);
		if(n) this.addTsNode(n);
		if(Node.isClassDeclaration(node)) node.forEachChild(nd=>this.add(nd, depth+1));
		if(Node.isTypeAliasDeclaration(node)) tsTypeProperty(node, depth+1).map(p=>this.addTsNode(p));
	}

	private addTsNode(node?: TsNode) {
		if(!node) return;
		const i = node.id in this.indices ? this.indices[node.id]:-1;
		if(~i) {
			const o = this[i];
			if(!o.kind.includes(node.kind)) o.kind += ' ' + node.kind;
			o.comment += '\n' + node.comment;
		} else {
			this.indices[node.id] = this.length;
			this.push(node);
		}
	}
};

export default tsNodeList;