import { FC } from "react";
import D from "~/geometry/D";

export interface GlyphProps {
	d: string | D
}

const Glyph: FC<GlyphProps> = ({d}) => {
	const p = typeof d === 'string' ? new D(d):d;
	return (<svg>
		<path d={''+p} fill="rgb(28,128,248)"/>
	</svg>)
}

export default Glyph;