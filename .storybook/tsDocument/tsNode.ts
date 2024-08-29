
import { NamedNode, Node, ScriptTarget, Signature, SyntaxKind as SK, Symbol, Type} from "ts-morph";
import { __src } from "../constants";
import { TsNode } from "./types";
import { $a, $dec, $lit, $wrap } from "./tsDecs";
import { createPrinter, createSourceFile, ScriptKind } from "typescript";


const selfSymbol = '&lcub;...&rcub;';

/**
 * The goal here is to use type declarations to find nodes of properties that only directly belong to this declaration... no aliased properties
 * @param node 
 * @param depth 
 * @returns 
 */
export  const tsTypeProperty = (node: Node, depth:number):TsNode[] => {
	
	const findProps = (t: Type) => {
		return t.isUnion() ? t.getUnionTypes().flatMap(findProps)
		: t.isIntersection() ? t.getIntersectionTypes().flatMap(findProps)
		: t.isTuple() ? t.getTupleElements().flatMap(findProps)
		: (t.isObject() && t.isAnonymous()) ? t.getProperties().flatMap(s=>s.getDeclarations().map(n=>tsNode(n, depth)))
		: [];
	}
	const p = findProps(node.getType());
	return p;
}

export const getTypeName = (node: Node) => {
	const t = node.getType()
	const symbol = t.getAliasSymbol() ?? t.getSymbol();
	return symbol?.getName()
}
export const tsNode = (node: Node, depth: number): TsNode | undefined => {
	if(!('getName' in node) || typeof node.getName !== 'function') return undefined
	const name = (node as unknown as NamedNode).getName();
	const kind = tsKind(node);
	
	if(!name || !kind) {
		return undefined;
	} 
	const type = node.getType();
	//if(Node.isPropertySignature(node)) console.log(name, kind, type);
	const comment = Node.isJSDocable(node) ? node.getJsDocs().reduce((o,v)=>o+'\n'+v.getComment(), ''):'';
	const id = node.getSourceFile().getFilePath().slice(0, -3).replace(__src+'/', '').replace(/\//g, '-')+'-'+name.toLowerCase();
	const tsSignature = (t: Type) => {
		const link = tsAliasLink(t);
		return link ? link
		: t.isUndefined() ? $dec`undefined`
		: t.isUnknown() ? $dec`unknown`
		: t.isNull() ? $dec`null`
		: t.isNever() ? $dec`never`
		: t.isAny() ? $dec`any`
		: t.isBoolean() ? $dec`boolean`
		: t.isNumber() ? $dec`number`
		: t.isString() ? $dec`string`
		: t.isStringLiteral() ? $lit`"${t.getLiteralValue() as string}"`
		: t.isLiteral() ? $lit`${t.getLiteralValue() as string}`
		: t.isUnion() ? t.getUnionTypes().map(tsSignature).join(' | ')
		: t.isIntersection() ? t.getIntersectionTypes().map(tsSignature).join(' & ')
		: t.isTuple() ? $wrap('[%]', t.getTupleElements().map(tsSignature).join(', '))
		: tsSymbol(t) ?? 'N/A';
	}
	const tsFunction = ([signature]: Signature[]) => {
		if(!signature) return undefined;
		return `(${signature.getParameters().map(p=>`${p.getName()}: ${tsSignature(p.getValueDeclaration()!.getType())}`).join(', ')})=>${tsSignature(signature.getReturnType())}`
	}
	const tsSymbol = (t: Type) => {
		const symbol = t.getSymbol();
		if(!symbol) {
			console.log("No symbol", !!t.getAliasSymbol(), t.getText());
			return undefined;
		}
		const nm = symbol.getName();
		if(nm.startsWith('__')){
			return tsFunction(t.getCallSignatures()) ?? selfSymbol;
		}
		const href = tsHref(symbol);
		return tsLink(nm, href, t.getTypeArguments());
	}
	const tsAliasLink = (t: Type) => {
		const alias = t.getAliasSymbol();
		if(!alias) return undefined;
		
		const nm = alias.getName();
		if(nm === name) return undefined;
		const href = tsHref(alias);
		return tsLink(nm, href, t.getAliasTypeArguments());
	}

	const tsHref = (symbol: Symbol) => {
		const nm = symbol.getName();
		const src = symbol.getDeclarations()[0].getSourceFile().getFilePath();
		if(!src.startsWith(__src)) return undefined;
		return '/?path=/docs/' + src
		.replace(__src+'/', '') //remove path up to source
		.slice(0, -3) //remove the file extension
		.replace(/\//g, '-') + `--docs#${nm.toLowerCase()}` //add the hyphen notation storybook uses
	}

	const tsLink = (name: string, href?:string, args?: Type[]) => {
		return (href ? $a(href)`${name}`:$dec`${name}`)+((args && args.length) ? `&lt;${args.map(tsSignature)}&gt;`:'');
	}

	const signature = tsSignature(type);
	return {
		id,
		name,
		comment,
		kind,
		signature,
		depth,
		code: !['class', 'type', '.property'].includes(kind) ? getCode(node):undefined
	}
};


export const tsHref = (symbol: Symbol, name: string) => {
	const fp = symbol.getDeclarations()[0].getSourceFile().getFilePath();
	if(!fp.startsWith(__src)) return undefined; //Dont link to external types
	return '/docs/' + fp
	.replace(__src+'/', '') //remove path to the src directory
	.slice(0, -3) //drop the .ts extension
	.replace(/\//g, '-') + '-' + name + '--docs' //replace path elements with - then add the name and the --docs declaration
};

export const tsKind = (node: Node) => {
	switch(node.getKind()){
		case SK.TypeAliasDeclaration: return 'type';
		case SK.VariableDeclaration: return 'const';
		case SK.InterfaceDeclaration: return 'interface';
		case SK.FunctionDeclaration: return 'function'; //todo build in special generator type here
		case SK.ClassDeclaration: return 'class';
		case SK.EnumDeclaration: return 'enum';
		case SK.MethodDeclaration: return 'method';
		case SK.PropertySignature: return '.property'
		case SK.PropertyDeclaration: return 'property';
		case SK.GetAccessor: return 'get';
		case SK.SetAccessor: return 'set';
	}
	return undefined;
}

const getCode = (node: Node) => {
	const text = node.getText();
	switch(node.getKind()){
		case SK.MethodDeclaration:
		case SK.PropertyDeclaration:
		case SK.GetAccessor:
		case SK.SetAccessor: return wrapcode(text, 'class {%}');
	}
	return recode(text);
}
const wrapcode = (text: string, wrapper: string) => {
	const [prefix, suffix] = wrapper.split('%');
	const code = recode(prefix+text+suffix);
	return code.slice(prefix.length, -suffix.length-1).replace(/\n\s{4}/g, '\n');
}
const recode = (text: string) => createPrinter({removeComments: true})
	.printFile(createSourceFile('temp.ts', text, ScriptTarget.Latest, false, ScriptKind.TS))