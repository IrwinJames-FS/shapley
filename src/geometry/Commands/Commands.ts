
import { Command } from "./Command";

import { stride } from "../utils";

/**
 * All path commands are alias to [SVG path commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)
 * @todo tsdoc addon has been updated and this creates extraneous directories. 
 * @example
 * import { Commands } from "@irwinproject/shapley";
 * //or
 * import { Commands } from "@irwinproject/shapley/geometry";
 * //or
 * import Commands from "@irwinproject/shapley/geometry/commands";
 * 
 * const { z, Z, h, H, v, V, m, M, l, L, t, T, s, S, q, Q, c, C, a, A} = Commands;
 */
interface Commands {
	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#closepath" target="_blank">Closing Path (Z)</a>
	 * @example
	 * Z(); //Command<"Z">
	 */
	Z():Command<"Z">

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#closepath" target="_blank">Closing Path (z)</a>
	 * @example
	 * z(); //Command<"z">
	 */
	z():Command<"z">

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands" target="_blank">Horizontal line to command (H)</a>
	 * @param values - each value is treated as an absolute value on the X axis using the current Y value.
	 * @example
	 * H(10); //Command<"H">
	 */
	H(...values: number[]): Command<"H">


	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands" target="_blank">Horizontal line to command (h)</a>
	 * @param values - each value is treated as a x value
	 * @example
	 * h(10); //Command<"h">
	 */
	h(...values: number[]): Command<"h">

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands" target="_blank">Vertical line to command (V)</a>
	 * @param values - each value is treated as a y value
	 * @example
	 * V(10); //Command<"V">
	 */
	V(...values: number[]): Command<"V">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands" target="_blank">Vertical line to command (v)</a>
	 * @param values - each value is treated as a y value
	 * @example
	 * v(10); //Command<"v">
	 */
	v(...values: number[]): Command<"v">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#moveto_path_commands" target="_blank">Move to command (M)</a>
	 * @param values - [x, y, ...] every two values is used as an instance.
	 * @example
	 * M(50,0, 100,50, 50,100 0,50); //Command<"M"> (draws a diamond.)
	 */
	M(...values: number[]): Command<"M">

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#moveto_path_commands" target="_blank">Move to command (m)</a>
	 * @param values - [x, y, ...] every two values is used as an instance.
	 * @example
	 * 
	 * m(50,0, 50,50, -50,50 -50,-50); //Command<"m"> (draws a diamond.)
	 */
	m(...values: number[]): Command<"m">

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands" target="_blank">Line to command (L)</a>
	 * @param values - [x, y, ...] every two values is used as an instance.
	 * @example
	 * 
	 * L(50, 0); //Command<"L">
	 */
	L(...values: number[]): Command<"L">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands" target="_blank">Line to command (l)</a>
	 * @param values - [x, y, ...] every two values is used as an instance.
	 * @example
	 * 
	 * l(50, 0); //Command<"l">
	 */
	l(...values: number[]): Command<"l">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#quadratic_bézier_curve" target="_blank">Quadratic reflective curve command (T)</a>
	 * @param values - [x, y, ...] every two values is used as an instance.
	 * @example
	 * 
	 * T(50, 50); //Command<"T">
	 */
	T(...values: number[]): Command<"T">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#quadratic_bézier_curve" target="_blank">Quadratic reflective curve command (t)</a>
	 * @param values - [x, y, ...] every two values is used as an instance.
	 * @example
	 * 
	 * t(50, 50); //Command<"t">
	 */
	t(...values: number[]): Command<"t">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_bézier_curve" target="_blank">Cubic bezier curve command (S)</a>
	 * @param values - [cx, cy, x, y] every four values are used as an instance.
	 * @example
	 * 
	 * S(50, 50, 0, 100);
	 */
	S(...values: number[]): Command<"S">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_bézier_curve" target="_blank">Cubic bezier curve command (s)</a>
	 * @param values - [cx, cy, x, y] every four values are used as an instance
	 * @example
	 * 
	 * s(50, 50, 0, 100);
	 */
	s(...values: number[]): Command<"s">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#quadratic_bézier_curve" target="_blank">Quadratic curve command (Q)</a>
	 * @param values - [cx, cy, x, y] every four values are used as an instance
	 * @example
	 * Q(50, 50, 0, 100);
	 */
	Q(...values: number[]): Command<"Q">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#quadratic_bézier_curve" target="_blank">Quadratic curve command (q)</a>
	 * @param values - [cx, cy, x, y] every four values are used as an instance
	 * @example
	 * q(50, 50, 0, 100);
	 */
	q(...values: number[]): Command<"q">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_bézier_curve" target="_blank">Cubic bezier curve command (C)</a>
	 * @param values - [cx, cy, dx, dy, x,y] every six values are used as an instance
	 * @example
	 * C(50, 25, 50,75, 0, 100);
	 */
	C(...values: number[]): Command<"C">,
	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_bézier_curve" target="_blank">Cubic bezier curve command (C)</a>
	 * @param values - [cx, cy, dx, dy, x,y] every six values are used as an instance
	 * @example
	 * c(50, 25, 50,75, 0, 100);
	 */
	c(...values: number[]): Command<"c">,
	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve" target="_blank">Elliptical arc curve command (A)</a>
	 * @param values - [rx, ry, angle, lg-arc-flag, sweep-flag, x, y] every seven values are used as an instance
	 * @example
	 * A(25, 25, 180, 1, 0, 100,100);
	 */
	A(...values: number[]): Command<"A">,

	/**
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve" target="_blank">Elliptical arc curve command (a)</a>
	 * @param values - [rx, ry, angle, lg-arc-flag, sweep-flag, x, y] every seven values are used as an instance
	 * @example
	 * a(25, 25, 180, 1, 0, 100,100);
	 */
	a(...values: number[]): Command<"a">
}

export default {
	Z() {
		return new Command("Z");
	},
	z() {
		return new Command("z");
	},
	H(...values:number[]){
		return new Command("H", ()=>stride(values, 1));
	},
	h(...values: number[]){
		return new Command("h", ()=>stride(values, 1));
	},
	V(...values: number[]){
		return new Command("V", ()=>stride(values,1));
	},
	v(...values: number[]){
		return new Command("v", ()=>stride(values, 1));
	},
	M(...values: number[]){
		return new Command("M", ()=>stride(values, 2));
	},
	m(...values: number[]){
		return new Command("m", ()=>stride(values, 2));
	},
	L(...values: number[]){
		return new Command("L", ()=>stride(values, 2));
	},
	l(...values: number[]){
		return new Command("l", ()=>stride(values,2));
	},
	T(...values: number[]){
		return new Command("T", ()=>stride(values,2));
	},
	t(...values: number[]){
		return new Command("t", ()=>stride(values, 2));
	},
	S(...values: number[]){
		return new Command("S", ()=>stride(values, 4));
	},
	s(...values: number[]){
		return new Command("s", ()=>stride(values, 4));
	},
	Q(...values: number[]){
		return new Command("Q", ()=>stride(values, 4));
	},
	q(...values: number[]){
		return new Command("q", ()=>stride(values, 4));
	},
	C(...values: number[]){
		return new Command("C", ()=>stride(values, 6));
	},
	c(...values: number[]){
		return new Command("c", ()=>stride(values, 6));
	},
	A(...values: number[]){
		return new Command("A", ()=>stride(values, 7));
	},
	a(...values: number[]){
		return new Command("a", ()=>stride(values, 7));
	}
} as Commands;


