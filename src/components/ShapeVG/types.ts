import { Vector } from "../../geometry/types";
import { PVGProps } from "../PVG";

export type ShapeVGProps = Omit<PVGProps, "d"> & {
	generator: Generator<Vector>
	cornerRadius?: number | number[]
	rotation?: number
}