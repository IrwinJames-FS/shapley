import { SourceFile } from "ts-morph";
import tsNodeList from "./tsNodeList";
import { __docs, __src } from "../constants";
import path from "path";
import { $code, $dec, $h, $lbl } from "./tsDecs";
import fs from "fs";

/**
 * Curates a series of nodes and displays them as a documentation file
 * @param file 
 */
const tsSourceFile = (file: SourceFile) => {
	const nodes = new tsNodeList()
	file.forEachChild(node=>nodes.add(node));
	if(!nodes.length) return;
	const title = file.getFilePath().replace(__src+'/', '').slice(0, -3);
	if(title.endsWith('.test')) return;
	const p = path.join(__docs, title.replace(/\//g, '.')+'.mdx')
	let doc = `import { Meta } from '@storybook/blocks';
	
<Meta title="${title}" />

`;
	for(const {kind, name, signature, comment, code, depth} of nodes) {
		doc += `<div style={{paddingLeft: '${depth}rem'}}>
${$dec`${kind}`}\n\n
${name ? $h(2+depth, name):''}
${$lbl('Signature', signature)}

${comment ?? ''}

${code ? $code(code):''}

---\n\n\n
</div>`;
	}

	fs.writeFileSync(p, doc);
}

export default tsSourceFile;

