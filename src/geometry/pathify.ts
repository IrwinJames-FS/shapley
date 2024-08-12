import { rounded } from "./iterators";
import { $d } from "./ngon";
import { Vector } from "./types";

export const pathify = (gen: Generator<Vector>, cornerRadius:number | number[]):string => {
	let path = "";
	for(const [c, s, e] of rounded(gen, cornerRadius)) {
		const cmd = path ? " L":"M";
		if(!s || !e) path += $d`${cmd} ${c}`;
		else path += $d`${cmd} ${s!} Q ${c} ${e!}`
	}
	return path+'z';
}