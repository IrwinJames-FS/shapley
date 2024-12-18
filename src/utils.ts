export const zip = (strings: TemplateStringsArray, args: unknown[]) =>{
	let str = '';
	for(let i = 0; i < strings.length; i++){
		str += strings[i] + (args[i] ?? '');
	}
	return str;
}
export const mergeClasses = (classNames: string | undefined) => (strings: TemplateStringsArray, ...args: unknown[])=>zip(strings, args);