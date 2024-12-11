import { ClosingCommand } from "../../dist/types";
import Command, {CommandChar} from "./Command";
import { stride } from "./utils";

/**
 * Path Command methods are a convenience method to utilize the same characters as the SVG command path spec.
 */
type PathCommand<T extends CommandChar> = (...values:number[])=>Command<T>
/**
 * A closing statement 
 * @returns 
 */
export const Z:PathCommand<"Z"> = ()=>new Command("Z");
export const z:PathCommand<"z"> = ()=>new Command("z");
export const H:PathCommand<"H"> = (...values:number[])=>new Command("H", ()=>stride(values,1));
export const h:PathCommand<"h"> = (...values:number[])=>new Command("h", ()=>stride(values,1));
export const V:PathCommand<"V"> = (...values:number[])=>new Command("V", ()=>stride(values,1));
export const v:PathCommand<"v"> = (...values:number[])=>new Command("v", ()=>stride(values,1));
export const M:PathCommand<"M"> = (...values: number[]) => new Command("M", ()=>stride(values, 2));
export const m:PathCommand<"m"> = (...values: number[]) => new Command("m", ()=>stride(values, 2));
export const L:PathCommand<"L"> = (...values: number[]) => new Command("L", ()=>stride(values, 2));
export const l:PathCommand<"l"> = (...values: number[]) => new Command("l", ()=>stride(values, 2));
export const T:PathCommand<"T"> = (...values: number[]) => new Command("T", ()=>stride(values, 2));
export const t:PathCommand<"t"> = (...values: number[]) => new Command("t", ()=>stride(values, 2));
export const S:PathCommand<"S"> = (...values: number[]) => new Command("S", ()=>stride(values, 4));
export const s:PathCommand<"s"> = (...values: number[]) => new Command("s", ()=>stride(values, 4));
export const Q:PathCommand<"Q"> = (...values: number[]) => new Command("Q", ()=>stride(values, 4));
export const q:PathCommand<"q"> = (...values: number[]) => new Command("q", ()=>stride(values, 4));
export const C:PathCommand<"C"> = (...values: number[]) => new Command("C", ()=>stride(values, 6));
export const c:PathCommand<"c"> = (...values: number[]) => new Command("c", ()=>stride(values, 6));
export const A:PathCommand<"A"> = (...values: number[]) => new Command("A", ()=>stride(values, 7));
export const a:PathCommand<"a"> = (...values: number[]) => new Command("a", ()=>stride(values, 7));