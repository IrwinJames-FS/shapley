/**
 * The SVG closing commands
 */
export type ClosingCommandChar = "Z" | "z";

/**
 * The SVG commands that expect a single value for each instance.
 */
export type SingleCommandChar = "H" | "h" | "V" | "v";

/**
 * The SVG commands that expects two values for each instance.
 */
export type BiCommandChar = "M" | "m" | "L" | "l" | "T" | "t";

/**
 * The SVG commands that expects four values for each instance.
 */
export type QuadCommandChar = "S" | "s" | "Q" | "q";

/**
 * The SVG commands that expects six values for each instance.
 */
export type HexCommandChar = "C" | "c";

/**
 * The SVG commands that expects 7 values and only two of them can be translated.
 */
export type ArcCommandChar = "A" | "a";

/**
 * The culmination of all the SVG path commands.
 */
export type CommandChar = ClosingCommandChar | SingleCommandChar | BiCommandChar | QuadCommandChar | HexCommandChar | ArcCommandChar;

/**
 * In attempts to make typing a bit more coherent this type alias associates a length to a command type
 */
export type CommandLength<T extends CommandChar> = T extends ClosingCommandChar ? 0
: T extends SingleCommandChar ? 1
: T extends BiCommandChar ? 2
: T extends QuadCommandChar ? 4
: T extends HexCommandChar ? 6
: 7;

/**
 * Command instances are represented as tuples when iterating over each instance stored within a command. 
 */
export type CmdArgs<T extends CommandChar> = T extends ClosingCommandChar ? []
: T extends SingleCommandChar ? [number]
: T extends BiCommandChar ? [number, number]
: T extends QuadCommandChar ? [number, number, number, number]
: T extends HexCommandChar ? [number, number, number, number, number, number]
: [number, number, number, number, number, number, number]

/**
 * The Command class expects an Generator method that feeds the information to the generator.
 */
export type CommandArguments<T extends CommandChar> = ()=>Generator<CmdArgs<T>>;