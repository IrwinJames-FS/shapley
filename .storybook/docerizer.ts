import path from 'path';
import fs from 'fs/promises';
import { Project, SourceFile, Node, SyntaxKind, VariableStatement } from 'ts-morph';
import { $declaration } from './renderer/decorators';
const docsDir = "./docs";
const root = path.join(__dirname, '../');
const docsPath = path.join(root, docsDir);
const srcPath = path.join(root, './src');

/**
 * Packages up documentation and creates mdx files
 */
const docerizer = async () => {
	//remove and replace docs directory
	await replaceDocs();
	const project = new Project();
	//only watch .ts files
	project.addSourceFilesAtPaths(path.join(srcPath, '**/*.ts'));
	const urls = project.getSourceFiles().map(renderSourceFile).filter(v=>!!v);
	console.log(urls.length);


};

export default docerizer;

const renderSourceFile = async (file: SourceFile) => {
	const filePath = file.getFilePath();
	const relativePath = filePath.replace(srcPath, '');
	const fileName = relativePath.slice(1).replace(/\//g, '.').replace('.ts', '.mdx');
	const docPath = path.join(docsPath, fileName);
	if(fileName.endsWith('.test.mdx')) return;
	const blocks: string[] = [];
	file.forEachChild(node=>handleNode(node, blocks));
	if(!blocks.length) return;
	const doc = `import { Meta } from '@storybook/blocks';

<Meta title="${relativePath}" />

${blocks.join('\n')}`;
	await fs.writeFile(docPath, doc)
	return filePath; //the url to watch... might not use this might just use an umbrella watch.
};

const handleNode = (node: Node, blocks: string[]) => {
	if(!Node.isJSDocable(node)) return undefined;
	const jdoc = node.getJsDocs();
	const kind = node.getKind();
	const block: string = `${getHeader(node, kind)}
${jdoc.map(d=>d.getComment()).join('\n')}
	`;
	
	if(block) blocks.push(block);
}

const getHeader = (node: Node, kind: SyntaxKind): string => {
	switch(kind) {
		case SyntaxKind.FunctionDeclaration:
		case SyntaxKind.FunctionExpression:
		case SyntaxKind.ArrowFunction:
			return `## ${$declaration`function`} ${Node.isNamed(node) ? node.getName():'default'}`
		case SyntaxKind.VariableStatement:
			if(Node.isFunctionLikeDeclaration(node) || Node.isArrowFunction(node)) console.log("I might be mistaken");
			(node as VariableStatement).getDeclarations().forEach(n=>{
				console.log(n.getType());
			})
			return `## ${$declaration`const`} ${(node as VariableStatement).getDeclarations()[0]?.getName() ?? 'default'}`
	}
	return '';
}
const replaceDocs = async () => {
	const files = await fs.readdir(root);
	if(files.includes('docs')) await fs.rm(docsPath, {recursive: true});
	return fs.mkdir(docsPath);
}

