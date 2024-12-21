import { Fragment, isValidElement, ReactElement } from "react";

export const zip = (strings: TemplateStringsArray, args: unknown[]) =>{
	let str = '';
	for(let i = 0; i < strings.length; i++){
		str += strings[i] + (args[i] ?? '');
	}
	return str;
}
export const mergeClasses = (classNames: string | undefined) => (strings: TemplateStringsArray, ...args: unknown[])=>zip(strings, args);

/** 
This is an internal type I dont know if it will work but its just to try to identify transitional elements because they fail the isValidComponent check.

I take no credit claude gave me most of it. 

It doesnt actually enforce the props but will allow you to index using assumed props in typescript. 
*/
export const isTransitionalElement = <T extends {}>(element: React.ReactNode): element is ReactElement<Partial<T>> => {
	if (!element || typeof element !== 'object') {
	  return false;
	}
	
	// Type guard to check if element is a ReactElement
	if (isValidElement(element)) return true;
  
	
	// Type assertion since we're checking internal React properties
	const elementType = (element as any).type;
	
	return (
	  // Check if it's a React element
	  (element as any).$$typeof === Symbol.for('react.element') &&
	  // Check if it's a transitional type
	  elementType?.$$typeof === Symbol.for('react.transitional.element')
	);
  };

  export const isFragment = (el: ReactElement) => el.type === Fragment;