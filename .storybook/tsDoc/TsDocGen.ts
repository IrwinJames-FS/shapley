import { promises as fs } from 'fs';
import { __docs, __root, __src } from './constants';
import { Project, SourceFile } from 'ts-morph';
import path from 'path';
import { getDocPathFromTitle, getTitleFromFilePath } from './utils';
import { MDXDocument } from './Components';
import { tsBlocks } from './tsBlocks';
import { TsBlock } from './types';


/**
 * Manages all the discovered files and generates the appropriate documentation files. 
 */
export class TsDocGen {
	project: Project
	constructor(){
		this.project = new Project({
			tsConfigFilePath: path.join(__root, 'tsconfig.json')
		});
		this.project.addSourceFilesAtPaths(path.join(__src, "**/*.ts"));
		const tests = this.project.getSourceFiles().filter(n=>n.getFilePath().endsWith('.test.ts'));
		for(let t of tests) this.project.removeSourceFile(t);
	}

	async load(){
		await this.initDocsDirectory();
		await this.documentSources();
	}

	async documentSources(){
		for(const source of this.project.getSourceFiles()) await this.documentSource(source);
	}

	async documentSource(source: SourceFile){
		const title = getTitleFromFilePath(source.getFilePath());
		const blocks: TsBlock[] = [];
		source.forEachChild(n=>{
			blocks.push(...tsBlocks(n));
		});
		fs.writeFile(getDocPathFromTitle(title), MDXDocument(title, ...blocks.map(b=>b.content)));
	}

	async initDocsDirectory(){
		const fls = await fs.readdir(__root);
		if(fls.includes('docs')) await fs.rm(__docs, {recursive: true});
		await fs.mkdir(__docs);
	}

	async updateSourceFile(file: string){
		if(!file.startsWith(__src)) return;
		let source = this.project.getSourceFile(file);
		if(!source) source = this.project.addSourceFileAtPath(file);
	}
}