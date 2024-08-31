
import { AccessorDeclaration, MethodDeclaration, NamedNode, Node, PropertyDeclaration, Signature, SyntaxKind as SK, Symbol, Type, TypeAliasDeclaration } from "ts-morph";
import { __src } from "../constants";
import { TsNode } from "./types";
import { $a, $dec, $lit, $param, $wrap } from "./tsDecs";


const selfSymbol = '&lcub;...&rcub;';

/**
 * The goal here is to use type declarations to find nodes of properties that only directly belong to this declaration... no aliased properties
 * @param node 
 * @param depth 
 * @returns 
 */
export  const tsTypeProperty = (node: Node, depth:number):TsNode[] => {
	const name = ('getName' in node) && typeof node.getName === 'function' ? node.getName():'N/A'
	
	const isSelf = (t: Type) => {
		if(!t.isObject()) return false;
		const alias = t.getAliasSymbol();
		if(!alias){
			const nm = t.getSymbol()?.getName();

			return !!nm && (name === nm || nm.startsWith("__"));
		}
		const nm = alias?.getName();
		return nm === name;
	}
	const findProps = (t: Type) => {
		return isSelf(t) ? t.getProperties().flatMap(s=>s.getDeclarations().flatMap(n=>tsNode(n, depth)))
		: t.isUnion() ? t.getUnionTypes().flatMap(findProps)
		: t.isIntersection() ? t.getIntersectionTypes().flatMap(findProps)
		: t.isTuple() ? t.getTupleElements().flatMap(findProps)
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
export const tsNode = (node: Node, depth: number): TsNode[] => {
	if(isPrivate(node)) return [];
	if(Node.isVariableStatement(node)) return node.getDeclarations().flatMap(tsNode)
		if(!('getName' in node) || typeof node.getName !== 'function') return [];
	const name = (node as unknown as NamedNode).getName();
	const kind = tsKind(node);
	
	if(!name || !kind) {
		return [];
	} 
	const type = node.getType();
	//if(Node.isPropertySignature(node)) console.log(name, kind, type);
	const comment = Node.isJSDocable(node) ? node.getJsDocs().reduce((o,v)=>{
		const cmt = v.getComment();
		return o === cmt ? o:o+'\n'+cmt;
	}, ''):'';
	const id = node.getSourceFile().getFilePath().slice(0, -3).replace(__src+'/', '').replace(/\//g, '-')+'-'+name.toLowerCase();

	const tsSignature = (t: Type) => {
		const link = tsAliasLink(t) ?? tsSymbol(t);
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
		: tsSymbol(t) ?? noNameFound(t);
	}
	const noNameFound = (t:Type) => t.getText();
	const tsFunction = ([signature]: Signature[]) => {
		if(!signature) return undefined;
		return `(${signature.getParameters().map(p=>`${p.getName()}: ${tsSignature(p.getValueDeclaration()!.getType())}`).join(', ')})=>${tsSignature(signature.getReturnType())}`
	}
	const tsSymbol = (t: Type) => {
		const symbol = t.getSymbol();
		if(!symbol) {
			return undefined;
		}
		const nm = symbol.getName();
		if(nm.startsWith('__') || nm === name){
			if(name==="PathDefinitionProps") console.log(nm, name, t.getText())
			return tsFunction(t.getCallSignatures()) ?? selfSymbol;
		}
		if(name === 'rayDeg') console.log("Raydeg", nm)
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
		const pth = toPathDir(src, '', nm);
		if(!pth) return undefined;
		return pth
	}

	const tsLink = (name: string, href?:string, args?: Type[]) => {
		return (href ? $a(href)`${name}`:$dec`${name}`)+((args && args.length) ? `&lt;${args.map(tsSignature)}&gt;`:'');
	}

	const tsSourceLink = (node: Node) => {
		const src = node.getSourceFile().getFilePath();
		const ln = node.getStartLineNumber()
		const p = toPathDir(src, 'source', ''+ln);
		if(!p) return undefined;
		return `<a href="${p}">${src.replace(__src+'/', '')}(ln: ${ln})</a>`;
	};

	const getGenerics = (node:Node)=>{
		if(!Node.isTypeAliasDeclaration(node)) return undefined;
		const params = (node as TypeAliasDeclaration).getTypeParameters();
		if(!params.length) return undefined;
		return params.map(p=>{
			const constraint = p.getConstraint()?.getType()
			return $param`${p.getName()}`+`${constraint ? ' extends '+tsSignature(constraint):''}`
		}).join(', ');
	}
	const signature = tsSignature(type);
	const optional = isOptional(node);
	
	return [{
		id,
		generics: getGenerics(node),
		name,
		comment,
		kind,
		signature,
		depth,
		src: tsSourceLink(node),
		optional
	}];
};

const isPrivate = (node: Node) =>  Node.isJSDocable(node) && !!node.getJsDocs().find(d=>d.getTags().find(t=>t.getTagName() === "private"));
const isOptional = (node: Node) => ('getQuestionTokenNode' in node && typeof node.getQuestionTokenNode === 'function') ? !!node.getQuestionTokenNode():false;
const toPathDir = (filePath: string, name:string='', header: string='') => filePath.startsWith(__src) ? '/?path=/docs/' + filePath
.replace(__src+'/', '')
.slice(0, -3)
.replace(/\//g, '-') + `${name ? '-'+name:''}--docs${header ? '#'+header:''}`
:undefined;

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
		case SK.VariableDeclaration: return node.getType().getCallSignatures().length ? 'function':'const';
		case SK.InterfaceDeclaration: return 'interface';
		case SK.FunctionDeclaration: return 'function'; //todo build in special generator type here
		case SK.ClassDeclaration: return 'class';
		case SK.EnumDeclaration: return 'enum';
		case SK.MethodDeclaration: return getNestedKind(node as MethodDeclaration, 'method');
		case SK.PropertySignature: return 'property'
		case SK.PropertyDeclaration: return getNestedKind(node as PropertyDeclaration, 'property');
		case SK.ConstructSignature: return 'constructor';
		case SK.Constructor: return 'constructor';
		case SK.ConstructorType: return 'constructor';
		case SK.GetAccessor: return getNestedKind(node as AccessorDeclaration, 'get');
		case SK.SetAccessor: return getNestedKind(node as AccessorDeclaration, 'set');
	}
	return undefined;
};

const getNestedKind = (node: MethodDeclaration | PropertyDeclaration | AccessorDeclaration, suffix: string) => [
	node.isStatic() && 'static',
	node.isAbstract() && 'abstract',
	suffix
].filter(f=>f).join(' ');