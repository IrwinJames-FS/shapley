type TemplateFn = (strings: TemplateStringsArray, ...args: string[]) => string;
const $z = (strings: TemplateStringsArray, args: string[]) => strings.reduce((o,v)=>o+v+(args.shift() ?? ''), '');
export const $s = (className: string, content: string) => `<span className="${className}">${content}</span>`;

export const $dec: TemplateFn = (strings, ...args) => $s('declaration-text', $z(strings, args));

export const $code = (value: string) => "\n```ts\n"+value+"\n```\n";

export const $h = (h: number, value: string) => `${new Array(h).fill("#").join('')} ${value}\n`