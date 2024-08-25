import path from 'path';
import fs from 'fs/promises';
import { Project, SourceFile, Node } from 'ts-morph';
import TsDocNode from './renderer/TsDocNode';
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
	await renderSources(project.getSourceFiles());
	//watchSrc(project); unfortunately changing this file outside of vites server environment has no effect on the document it serves so will have to do this the right way... later.
};

export default docerizer;

const wait = async (time:number)=>new Promise(res=>setTimeout(res, time));

const renderSources = async (files: SourceFile[]) => {
	for (const source of files) {
		await renderSourceFile(source);
		await wait(1e2);
	}
}
//exporting simply to silence error until I have time to revisit this issue.
export const watchSrc = async (project: Project) => {
	for await (const event of fs.watch(srcPath, {recursive: true})) {
		const {eventType, filename} = event;
		if(!filename || !filename?.endsWith('.ts')) continue;
		console.log(event);
		if(eventType === "change"){
			const src = project.getSourceFile(path.join(srcPath, filename));
			if(!src) continue;
			renderSourceFile(src);
		}
	}
}
const renderSourceFile = async (file: SourceFile) => {
	const filePath = file.getFilePath();
	const relativePath = filePath.replace(srcPath, '');
	const fileName = relativePath.slice(1).replace(/\//g, '.').replace('.ts', '.mdx');
	const docPath = path.join(docsPath, fileName);
	if(fileName.endsWith('.test.mdx')) return;
	const blocks = getDocBlocks(file);

	if(!blocks.length) return;
	const doc = `import { Meta } from '@storybook/blocks';

<Meta title="${relativePath.slice(1,-3)}" />

${blocks.join('\n')}`;

	await fs.writeFile(docPath, doc);
};

const getDocBlocks = (file: SourceFile | Node) => {
	const blocks: string[] = [];
	file.forEachChild(node => {
		if(!Node.isJSDocable(node)) return;
		const tsnode = new TsDocNode(node);
		blocks.push(''+tsnode);
		if(tsnode.isClass) blocks.push(...getDocBlocks(node));
	})
	return blocks;
}
const replaceDocs = async () => {
	const files = await fs.readdir(root);
	if(files.includes('docs')) await fs.rm(docsPath, {recursive: true});
	return fs.mkdir(docsPath);
}

