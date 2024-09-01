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
	file.forEachChild(node=>{
		nodes.add(node)
	});
	if(!nodes.length) return;
	const title = file.getFilePath().replace(__src+'/', '').slice(0, -3);
	if(title.endsWith('.test')) return;
	const p = path.join(__docs, title.replace(/\//g, '.')+'.mdx');
	const d = path.join(__docs, title.replace(/\//g, '.')+'.source.mdx');
	let doc = `import { Meta } from '@storybook/blocks';
	
<Meta title="${title}" />

`;
	for(const {kind, name, signature, comment, code, depth, src, optional, generics, extension} of nodes) {
		doc += `<div className="doc-block" style={{marginLeft: '${depth*2}rem'}}>
${$dec`${kind}${optional ? '?':''}`}\n\n
${name ? $h(2+depth, name):''}
${$lbl('Source', src)}
${$lbl('Extends', extension)}
${$lbl('Parameters', generics)}
${$lbl('Signature', signature)}

${comment ?? ''}

${code ? $code(code):''}

---\n\n\n
</div>`;
	}

	fs.writeFileSync(p, doc);
	fs.writeFileSync(d, `import { Meta } from '@storybook/blocks';
	
<Meta title="${title}/source" />

${$code(file.getText(), true)}`);
}

export default tsSourceFile;

