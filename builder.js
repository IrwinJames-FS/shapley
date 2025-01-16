const { cpSync } = require("fs");
const { globSync } = require("glob");
const path = require("path");
const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");
//move all css file 
const files = globSync(path.join(SRC, "**/*.css"));
for(let i = 0; i<files.length;i++){
	const file = files[i].replace(SRC, '')
	cpSync(files[i], path.join(DIST, "cjs", file))
	cpSync(files[i], path.join(DIST, "esm", file))
}
