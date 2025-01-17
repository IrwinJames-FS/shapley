
import Commands, { BiCommandChar, Command, CommandArguments, compPoint, isAbsolute, isClosingChar, isCommandChar }  from "./Commands";
import { Gen, GeneratorList } from "./Gen";
import { Bounds, Point } from "./types";
import { add, allConnected, angleTo, polygon, pt, ray, rollingThree, stride, toAbsolutePoints } from "./utils";
/** @private */
const {l, L, M, Q, z} = Commands;
/**
 * A Generator List using Command instances as elements. 
 */
export type Dgen = GeneratorList<Command>;

/**
 * D can be instanced using a number of base types. 
 * 
 * if a string is provided the string is parsed as a path command and instance of each command are created as necessary.
 * 
 * an array of numbers will be parsed in twos and generate 2 dimensional points using the pattern M (...points)z 
 * 
 * an array of commands can be provided. Unlike a string or array argument mutations to the orignal Command instance will be preserved across render loops. 
 * 
 * A Generator List behaves similar to a Command array.
 * 
 * The last type you can provide is a function that returns a generator which yields x and y coordinates and it behaves similar to a number array when parsing. 
 */
export type DInitTypes = string | number[] | Command[] | GeneratorList<Command> | CommandArguments<BiCommandChar>;
/**
 * D is a interactive representation of the information provided in the d property of a svg path. D uses reusable [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) as the source of true which allows for a simple interface to parse multiple source formats and types. 
 * 
 * D supports initializing from a [svg path command string](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)
 * 
 * D also supports initializing from an array of points ([x: number, y: number]). drawing a line from each point to form a shape. (D.shape and D.rounded offer options to round corners.)
 * 
 * One side effect of this is if the iterator returns an instance of a class modifications to that instance may be present in the next iteration. This may be desired in some use cases however in a react context the source of truth will typically be a stateful value or something that can trigger a render.
 * 
 * D provided specialized static initializers to simplify implementations.
 * 
 * @todo TypedArray Support
 * @example
 * import { D, Commands } from "@irwinproject/shapley";
 * //or 
 * import { D } from "@irwinproject/shapley/geometry/d";
 * const { M } = Commands
 * //Initialize from string 
 * const d = new D("M 50, 0 100, 100 0, 100");
 * 
 * //Initialize from point buffer
 * const d = new D([50, 0, 100, 100, 0, 100]);
 * 
 * //Initialize from a Generator<Point>
 * const d = new D(function*(){
 * 	yield M(50, 0, 100, 100, 0, 100);
 * });
 */
export class D extends Gen<Command> {
	
	private firstPosition?: Point
	
	private currentPosition?: Point

	/**
	 * The bounds will not be populated until the initial rendering the the D instance. 
	 * 
	 * every time the iterator runs it measures the provided path commands. 
	 */
	bounds: Bounds = [0,0,0,0,0,0];

	private margin: number = 0;
	private _aspectRatio?: string;

	/**
	 * The viewbox used to represent this specific glyph. 
	 */
	get viewBox(){
		const [mx, my, width, height] = this.bounds;
		const m = this.margin*2
		return `${mx-this.margin} ${my-this.margin} ${width+m} ${height+m}`;
	}

	/**
	 * The aspect based on the existing bounds. 
	 */
	get aspectRatio(){
		if(this._aspectRatio) return this._aspectRatio;
		
		return `${this.bounds[2]} / ${this.bounds[3]}`;
	}

	/**
	 * checks if the current object meets the criterea for object bounding
	 * 
	 * Shapes rely on this principle to properly pin the path to the bounds of the root html element.
	 */
	get isObjectBounding():boolean{
		const [mx, my, w, h] = this.getBounds();
		const mb = Math.min(mx, my, w, h);
		const Mb = Math.max(mx, my, w,h);
		const isOb = mb >= 0 && Mb <= 1;
		return isOb;
	}
	/**
	 * D offers a variety of static methods to simplify creating 
	 * D can be initialized with a svg path command. The string will be parsed on command so data is not duplicated in memory unecessarily. one fallback of this comes when animating shapes as it may be more beneficial to use an arry or raw generator. (the flatten method can be used to convert from svg one time then use raw data in subsequent renders.)
	 * 
	 * D can also be initialized using an array of numbers. If said method is provided every two numbers will be used as points to make a shape. This will simply prefix the numbers with an M and conclud with a z. 
	 * 
	 * D can be initialized with an array of command types 
	 * 
	 * and finally D can be initalized with a Generator function the yields command Types or *[x: number, y:number]* to define points.
	 * 
	 * Allowing a wide range of sources allows D to operate in a large variety use cases.
	 */
	constructor(args: DInitTypes, margin: number = 0){
		const gen = typeof args === 'string' ? D.parse(args)
		: typeof args === 'function' ? D.standardizeGenerator(args)
		: Array.isArray(args) 
		? typeof args[0] === 'number' ? D.fromLines(args as number[])
		: args[0] instanceof Command ? function*(){ yield* args as Command[]; }
		: function*(){} : function*(){}
		
		super(gen as GeneratorList<Command>);
		this.margin = margin;
	}

	/**
	 * Sets the margin used when calculating the viewBox.
	 */
	setMargin(margin: number){
		this.margin = margin;
		return this;
	}

	/**
	 * in some circumstances such as converting to objectBounding a measurement needs to be forced. the simplest way to complish this is to convert the class to a string and then observe the bounds. 
	 * 
	 */
	public getBounds():Bounds{
		//if(Math.max(...this.bounds) > 0) return this.bounds;
		//by forcing all of the instances to iterate we can force a measurement prior to render.
		const _ = ''+this;
		return this.bounds;
	}

	/**
	 * This method along with yielding the necessary commands it also tracks the strokes position. this allows more declarative mutations such as an efficient method to round lines. 
	 * It also allows Shapes and Glyphs (single path elements) to auto size themselves nicely. 
	 * @returns 
	 */
	*each(){
		let min: Point | undefined
		let max: Point | undefined

		for(const cmd of super.each()){
			cmd.currentPosition = this.currentPosition;

			yield cmd;
			if(!this.firstPosition) this.firstPosition = cmd.firstPosition;
			if(isClosingChar(cmd.fn)){
				this.currentPosition = this.firstPosition;
				this.firstPosition = undefined; //close the shape and start new 
			} else {
				this.currentPosition = cmd.finalPosition
			}
			min = compPoint(Math.min, cmd.min, min);
			max = compPoint(Math.max, cmd.max, max);
		}
		if(!min || !max){ 
			this.bounds = [0,0,0,0,0,0];
			return;
		}
		
		this.bounds = [...min, ...max.map((v,i)=>v-min[i]), ...max] as Bounds;
		this.currentPosition = undefined;
	}

	/**
	 * Translate the path
	 * 
	 * this will only translate Absolute commands and an the first m character provided.
	 */
	translate(x: number, y: number){
		return this.apply(gen=>function*(){
			let first = true;
			for(const cmd of gen()){
				if(!first && !isAbsolute(cmd.fn)) {
					yield cmd;
					continue;
				}
				first = false;
				yield cmd.translate(x, y);
			}
		});
	}

	/**
	 * Scales a path by the provided values.
	 * @param x 
	 * @param y 
	 * @returns 
	 */
	scale(x: number, y: number){
		return this.apply(gen=>function*(){
			for(const cmd of gen()){
				yield cmd.scale(x,y);
			}
		});
	}

	/**
	 * Converts a command path to objectBounding units. this is particularly helpful if the path is being used as a background or clip path. 
	 * 
	 * To this results in a non linear scaling method forcing the units into a square. to maintain a non square rectangle it is recomended you set an aspect ratio. 
	 */
	toObjectBounding(){
		const [mx,my,width, height] = this.getBounds();
		if(this.isObjectBounding) return this; //no need to do any math its already normalized.
		this._aspectRatio = this.aspectRatio;
		const sx = 1/width;
		const sy = 1/height;
		const tx = mx*sx*-1;
		const ty = my*sy*-1;
		this.scale(sx, sy) //scale the component down to a 1x1
		.translate(tx,ty) //move top left to (0,0);
		.flatten(); //work from a normalized point
		const d = ''+this;
		return this;
	}

	/**
	 * Returns a simple object that can be used to create a definition or reacreate a path command. 
	 */
	public cached(): DCacheItem{
		return {
			d: ""+this,
			aspectRatio: this.aspectRatio,
			objectBounding: this.isObjectBounding
		}
	}

	/**
	 * D can be converted to a path command string.
	 * @returns 
	 */
	toString(){
		let str = '';
		for(const cmd of this.each()){
			str += ' '+cmd;
		}
		return str.trim();
	}
	/**
	 * Standardizes generator functions to a GeneratorList&lt;Command&gt;
	 */
	static standardizeGenerator(gen: GeneratorList<Command> | CommandArguments<BiCommandChar>): GeneratorList<Command>{
		//check the first for value.. types cannot be mixed. 
		const g = gen().next().value;
		if(!g) return function*(){};
		if(g instanceof Command) return gen as GeneratorList<Command>;
		if(Array.isArray(g) && g.length === 2) return function*(){
			yield new Command("M", gen as CommandArguments<BiCommandChar>);
			yield new Command("z")
		}
		return function*(){};
	}

	/**
	 * Parse the d string path
	 */
	static parse(d: string): GeneratorList<Command>{
		return function*(){
			for(let i = 0; i<d.length;i++){
				if(isCommandChar(d[i])){
					yield Command.parse(d, i)
				}
			}
		}
	}

	/**
	 * Builds a shape from a number array.
	 */
	static fromLines(d: number[]): GeneratorList<Command>{
		return function*(){
			yield new Command("M", function*(){yield* stride(d, 2)});
			yield new Command("z");
		}
	}

	/**
	 * This convenience method generates regular polygons of a provided size. Additionally accepts various options to alter the rendering of the polygon. 
	 * (should this be called ngon?)
	 */
	static polygon(
		sides: number,
		{
			radius = 1,
			rotation = 0,
			cornerRadius = 0,
			center = [0,0],
			connectAll=false
		}: PolygonOptions = {}
	): D{
		const r = rotation * Math.PI/180;
		return connectAll ? new D(allConnected(polygon(sides, radius, center, r))):D.shape(cornerRadius, polygon(sides, radius, center, r))
	}

	

	
	/**
	 * Creates a point using a limited command spec however allows for corner rounding and shorhand notation 
	 */
	static shape(cornerRadius: number | number[], points: CommandArguments<BiCommandChar> | number[]): D{
		if(!cornerRadius) return new D(points);
		//there is a corner radius
		
		return new D(function*(){
			const gen = Array.isArray(points) ? stride(points, 2):points();
			let isPlaced = false;
			let i = 0;
			for(const r3 of rollingThree(gen)){
				if(r3.length !== 3) return yield new Command("M", function*(){yield* r3}); //just pass the stuff through as lines
				const [p,c,n] = r3;
				const pa = angleTo(c,p);
				const na = angleTo(c,n);
				const cr = Array.isArray(cornerRadius) ? cornerRadius[i]:cornerRadius;
				yield new Command(isPlaced ? "L":"M", function*(){
					yield ray(cr, pa, c);
				});
				isPlaced = true;
				
				yield new Command("S", function*(){
					yield [...c, ...ray(cr, na, c)];
				});
				i = (i + 3)
			}
			yield new Command("z");
		})
	}

	/**
	 * Iterates over each point and rounds vertex points. 
	 * 
	 * This method expects the first point to be exact then all subsequent points to be relative
	 */
	static rounded(cornerRadius: number | number[], d: number[], closed: boolean=false): D{
		//conver to absolute points
		const points = toAbsolutePoints(d);
		return new D(function*(){
			if(points.length < 3) {
				yield M(...points.flatMap(p=>p));
				return;
			}
			let previous = points[0];
			let current = points[1];
			let cr = Array.isArray(cornerRadius) ? cornerRadius[0]:cornerRadius;
			if(closed && cr){
				const pa = angleTo(previous, current);
				const start = ray(cr, pa, previous);
				yield M(...start);
			} else {
				yield M(...previous);
			}
			cr = Array.isArray(cornerRadius) ? cornerRadius[1]:cornerRadius;
			for(let i = 2; i<points.length;i++){
				const next = points[i];
				
				if(cr){
					const pa = angleTo(current, previous);
					const start = ray(cr, pa, current);
					yield L(...start);
					const na = angleTo(current, next);
					const end = ray(cr, na, current);
					yield Q(...current, ...end);
				} else {
					yield L(...current)
				}
				previous = current;
				current = next;
				cr = Array.isArray(cornerRadius) ? cornerRadius[i]:cornerRadius;
			}
			if(closed && cr){
				const pa = angleTo(current, previous);
				const start = ray(cr, pa, current);
				yield L(...start);
				const na = angleTo(current, points[0]);
				const end = ray(cr, na, current);
				yield Q(...current, ...end);
				cr = Array.isArray(cornerRadius) ? cornerRadius[0]:cornerRadius;
				const npa = angleTo(points[0], current);
				const nstart = ray(cr, npa, points[0]);
				yield L(...nstart);
				const nna = angleTo(points[0], points[1]);
				const nend = ray(cr, nna, points[0]);
				yield Q(...points[0], ...nend);
			} else {
				yield L(...current);
				if(closed) yield z();
			}
		});
	}
	
	/** reload an instance from a cached */
	static fromCached(cache: DCacheItem): D{
		const d = new D(cache.d)
		d._aspectRatio = cache.aspectRatio
		return d;
	}
}

/**
 * Polygon options are intended to simplify the polgon methods.
 */
export type PolygonOptions = {
	radius?: number,
	center?: Point,
	/**
	 * In degrees
	 */
	rotation?: number,
	cornerRadius?: number,
	/**
	 * Connect all disables corner radius.
	 */
	connectAll?:boolean
}
/**
 * Cached items provides the minimum necessary information to reconstruct an instance of D in another context.
 */
export type DCacheItem = {aspectRatio: string, d: string, objectBounding: boolean}

/**
 * The cache is used to rehydrate. 
 * 
 * In most cases this will be automatically updated and hydrated.
 */
export type DCache = Record<string, DCacheItem>;