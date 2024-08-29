import { Project } from "ts-morph";
import path from "path";
import { __docs, __root, __src } from "../constants";
import tsSourceFile from "./tsSourceFile";
import fs from "fs";

const tsDocument = () => {
	replaceDocs();
	const project = new Project();
	
	project.addSourceFilesAtPaths(path.join(__src, '**/*.ts'));
	project.getSourceFiles().forEach(tsSourceFile);
}

export default tsDocument;

const replaceDocs = () => {
	const files = fs.readdirSync(__root);
	if(files.includes('docs')) fs.rmSync(__docs, {recursive: true});
	fs.mkdirSync(__docs);
}