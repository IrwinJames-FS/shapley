/**
 * Generates the typical prefix for an MDX document. 
 * 
 * @todo Currently this method does not allow for additional imports.
 * @param title 
 * @param content 
 * @returns 
 */
export const MDXDocument = (title: string, ...content: string[]) => `import {Meta} from '@storybook/blocks';

<Meta title="${title}"/>

${content.join('')}`;

/**
 * Each declaration is contained to its own section. this will allow for simpler traversal later. 
 * @param content 
 * @returns 
 */
export const TsBlockSection = (...content: string[]) => `<section className="declaration-section">
	${content.filter(t=>t).join('\n')}
</section>`;

/**
 * While each declaration has a kind and a name things like signature may be represented in a more free form fashion. 
 * @param kind 
 * @param name 
 * @param content 
 * @returns 
 */
export const TsBlockTitle = (kind: string, name: string, ...content:string[]) => `<h3 className="declaration-title"><span className="declaration-kind">${kind}</span> <span className="declaration-name">${name}</span>${content.filter(t=>t).join('')}</h3>`;

export const Span = (className: string, content: string) => `<span className="${className}">${content}</span>`;

export const Link = (className: string, href: string, content: string) => `<a className="${className}" href="${href}">${content}</a>`;