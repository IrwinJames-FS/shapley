/*
## Psuedo Simd

A later optimization may be to utilize WebAssembly to make this process more expedient (I am not sure how that would work server side.) For now I will simulate simd to increase readability.
*/

import { Point, Vector } from "./types";

/**
 * Adds the values of **a** to the values of **b**. The array returned will be the same length as **a**
 * @param { number[] } a  
 * @param { number[] } b 
 * @returns { number[] }
 */
export const add = (a: number[], b: number[]): number[] => a.map((v,i)=>v+(b[i] ?? 0));

/**
 * Subtracts the values of array **b** from the values of **a**. The array returned will be the same length as **a**.
 * @param { number[] } a 
 * @param { number[] } b 
 * @returns { number[] }
 */
export const subtract = (a: number[], b: number[]): number[] => a.map((v, i)=>v-(b[i] ?? 0));

/**
 * Multiplies the values of **a** by the values of **b**. The array returned will be the same length as **a**.
 * @param { number[] } a 
 * @param { number[] } b 
 * @returns { number[] }
 */
export const multiply = (a: number[], b: number[]): number[] => a.map((v,i)=>v*(b[i] ?? 1));

/**
 * Divides the values of **a** by the values of **b**. The array returned will be the same length as **a**.
 * @param { number[] } a 
 * @param { number[] } b 
 * @returns { number[] }
 */
export const divide = (a: number[], b: number[]): number[] => a.map((v,i)=>v/(b[i] ?? 1));

//Ray casting in 2d

export const ray = (radius: number, angle: number, [x, y]:Point = [0,0]): Vector => [
	radius * Math.sin(angle) + x,
	radius * Math.cos(angle) + y,
	angle
];

//Scalars

