import { CSSProperties } from "react";
const $sx = (style: CSSProperties) => Object
.keys(style)
.map(k=>`${k}: ${typeof style[k] === 'string' ? `"${style[k]}"`:style[k]}`)
.join(', ');

const $style = (style?: CSSProperties) => style 
? `style={{${$sx(style)}}}`
: '';

const $zip = (strings: TemplateStringsArray, args: string[])=>{
	return strings.reduce((o,s,i)=>{
		if(!args[i-1]) return o+s;
		return o+s+args[i-1]
	})
}

export const $span = (style?: CSSProperties)=>(strings: TemplateStringsArray, ...args: string[])=>
	`<span ${$style(style)}>${$zip(strings, args)}</span>`;

export const $declaration = (strings: TemplateStringsArray, ...args: string[]) => $span({
	color: 'var(--declaration-color, purple)',
	fontSize: '0.9em',
	fontWeight: 'inherit'
})(strings, ...args);