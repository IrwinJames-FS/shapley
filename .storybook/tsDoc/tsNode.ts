/*
Just some convenience wrappers for the Node object
*/

import { Node } from "ts-morph";
import { getDocLinkPathFromFilePath, getTitleFromFilePath, isWithinLibrary } from "./utils";

export const getName = (node: Node) => Node.isNamed(node) ? node.getName():undefined;

export const getSource = (node: Node) => {
	const src = node.getType().getSymbol()?.getDeclarations().find(n=>n)?.getSourceFile().getFilePath();
	if(!src || !isWithinLibrary(src)) return '';
	return getDocLinkPathFromFilePath(src);
}