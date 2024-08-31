import { createPrinter, createSourceFile, NewLineKind, PrinterOptions, ScriptKind, ScriptTarget } from "typescript";
export const printCode = (code: string, options:PrinterOptions={newLine: NewLineKind.CarriageReturnLineFeed }) => {
	const file = createPrinter(options)
		.printFile(createSourceFile('temp.ts', code, ScriptTarget.Latest, false, ScriptKind.TS));
	return file;
}