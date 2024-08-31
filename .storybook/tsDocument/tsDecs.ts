
type TemplateFn = (strings: TemplateStringsArray, ...args: string[]) => string;

/**
 * Zips the arguments of a template string array back into a string
 * @param strings 
 * @param args 
 * @returns 
 */
const $z = (strings: TemplateStringsArray, args: string[]) => strings.reduce((o,v)=>o+v+(args.shift() ?? ''), '');

/**
 * Creates a span element with the provided class name
 * @param className 
 * @param content 
 * @returns 
 */
export const $s = (className: string, content: string) => `<span className="${className}">${content}</span>`;

/**
 * Creates a delcaration span
 * @param strings 
 * @param args 
 * @returns 
 */
export const $dec: TemplateFn = (strings, ...args) => $s('declaration-text', $z(strings, args));

/**
 * Creates a literal span
 * @param strings 
 * @param args 
 * @returns 
 */
export const $lit: TemplateFn = (strings, ...args) => $s('literal-text', $z(strings,args));

/**
 * Creates a parameter span
 * @param strings 
 * @param args 
 * @returns 
 */
export const $param: TemplateFn = (strings, ...args) => $s('type-param-name', $z(strings, args));

/**
 * Creates an anchor
 * @param href 
 * @returns 
 */
export const $a = (href:string): TemplateFn => (strings, ...args) => `<a href="${href}">${$z(strings,args)}</a>`;

/**
 * Creates a code preview with prisms typescript rule
 * @param value 
 * @returns 
 */
export const $code = (value: string, lineNums?: boolean) => {
	if(lineNums){
		
		const count = countLines(value);
		const lines = createLineNumbers(count);
		return `
<div className="numbered-code">
<div>
	${lines}
</div>
\`\`\`ts\n${value}\n\`\`\`
</div>`;
	}
	return `\`\`\`ts\n${value}\n\`\`\``;
}

const countLines = (value: string):number => {
	let c = 0;
	for(let i = 0; i < value.length; i++){
		if(value[i] === '\n') c++;
	}
	return c;
}
const createLineNumbers = (count: number):string => {
	let s = '';
	for(let i = 0; i < count; i++){
		s += `###### ${i+1}\n`;
	}
	return s;
}



/**
 * Creates a label element but only if a value is provided
 * @param name 
 * @param value 
 * @returns 
 */
export const $lbl = (name: string, value?: string) => value ? `**${name}**: ${value}\n\n`:'';

/**
 * Creates a header element of a provided size with the max being 6
 * @param h 
 * @param value 
 * @returns 
 */
export const $h = (h: number, value: string) => `${new Array(Math.min(h, 6)).fill("#").join('')} ${value}\n\n`;
export const $wrap = (wrapper:string, value?:string) => value ? wrapper.replace('%', value):undefined;