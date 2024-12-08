import { ComponentPropsWithoutRef, FC } from "react";

export const ShapleyCache: FC<ComponentPropsWithoutRef<"svg">> = ({children, ...props}) => (<svg {...props}>
	<defs>
		{children}
	</defs>
</svg>)