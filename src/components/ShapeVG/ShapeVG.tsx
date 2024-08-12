import { FC } from "react";
import PVG from "../PVG";
import { pathify } from "../../geometry";
import { ShapeVGProps } from "./types";

const ShapeVG: FC<ShapeVGProps> = ({generator, cornerRadius, ...props})=>{
	const d = pathify(generator, cornerRadius ?? 0);
	return <PVG {...{d, ...props}}/>
};

export default ShapeVG;