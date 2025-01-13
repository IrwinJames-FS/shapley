
import { Command } from "./Command";
import {CommandChar} from "./types";
import { stride } from "../utils";

/**
 * Path Command methods are a convenience method to utilize the same characters as the SVG command path spec.
 */
type PathCommand<T extends CommandChar> = (...values:number[])=>Command<T>

/**
 * A closing statement
 * @example
 * import { Z } from "@irwinproject/shapley";
 * 
 * Z(); //Command<"Z">
 * @returns 
 */
export const Z:PathCommand<"Z"> = ()=>new Command("Z");

/**
 * a relative closing statement
 * @returns 
 * @example
 * import { z } from "@irwinproject/shapley";
 * 
 * z(); //Command<"z">
 */
export const z:PathCommand<"z"> = ()=>new Command("z");

/**
 * draw an absolute horizontal line from the current position to the provided points
 * @param values 
 * @returns 
 * @example
 * import { H } from "@irwinproject/shapley";
 * 
 * H(10); //Command<"H">
 */
export const H:PathCommand<"H"> = (...values:number[])=>new Command("H", ()=>stride(values,1));

/**
 * draw a relative horizontal line from the current position to the provided offset.
 * @param values 
 * @returns 
 * 
 * @example
 * import { h } from "@irwinproject/shapley";
 * 
 * h(10); //Command<"h">
 */
export const h:PathCommand<"h"> = (...values:number[])=>new Command("h", ()=>stride(values,1));

/**
 * draw an absolute vertical line from the current position to the provided points.
 * @param values 
 * @returns 
 * @example
 * import { V } from "@irwinproject/shapley";
 * 
 * V(10); //Command<"V">
 */
export const V:PathCommand<"V"> = (...values:number[])=>new Command("V", ()=>stride(values,1));

/**
 * draw a relative vertical line from the current position to the provided offsets
 * @param values 
 * @returns 
 * @example
 * import { v } from "@irwinproject/shapley";
 */
export const v:PathCommand<"v"> = (...values:number[])=>new Command("v", ()=>stride(values,1));

/**
 * Move the current position to the absolute points provided
 * 
 * subsequent points provided will be treated as an L command
 * @param values 
 * @returns 
 * 
 * @example
 * import { M } from "@irwinproject/shapley";
 * 
 * M(50,0, 100,50, 50,100 0,50); //Command<"M"> (draws a diamond.)
 */
export const M:PathCommand<"M"> = (...values: number[]) => new Command("M", ()=>stride(values, 2));

/** */
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