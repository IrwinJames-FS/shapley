import { Project } from "ts-morph"
import path from "path";
import { __docs, __root, __src } from "./constants";
import tsSourceFile from "./tsDocument/tsSourceFile";
import fs from "fs";


const tsDoc = () => {
	const fls = fs.readdirSync(__root);
	if(fls.includes('docs')) fs.rmSync(__docs, {recursive: true});
	fs.mkdirSync(__docs);
	const project = new Project()
	project.addSourceFilesAtPaths(path.join(__src, "**/*.ts"))
	project.getSourceFiles().forEach(tsSourceFile);
};

export default tsDoc;