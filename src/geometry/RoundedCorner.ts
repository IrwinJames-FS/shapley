import Point from "./Point";
import { SupportedPointMathTypes } from "./types";

class RoundedCorner extends Array<number> {
	get x(){return this[0]}
	set x(n: number){this[0] = n}
	get y(){return this[1]}
	set y(n: number){this[1] = n}

	get sx(){return this[2]}
	set sx(n: number){this[2] = n}
	get sy(){return this[3]}
	set sy(n: number){this[3] = n}

	get ex(){return this[4]}
	set ex(n: number){this[4] = n}
	get ey(){return this[5]}
	set ey(n: number){this[5] = n}

	constructor([sx, sy]: SupportedPointMathTypes, [x,y]: SupportedPointMathTypes, [ex, ey]: SupportedPointMathTypes){
		super(x, y, sx, sy, ex,ey)
	}

	
	add([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx + x, this.sy + y],
			[this.x + x, this.y + y],
			[this.ex + x, this.ey + y]
		)
	}

	subtract([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx - x, this.sy - y],
			[this.x - x, this.y - y],
			[this.ex - x, this.ey - y]
		)
	}

	multiply([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx * x, this.sy * y],
			[this.x * x, this.y * y],
			[this.ex * x, this.ey * y]
		)
	}

	multiplyScalar(n: number){
		return new RoundedCorner(
			[this.sx * n, this.sy * n],
			[this.x * n, this.y * n],
			[this.ex * n, this.ey * n]
		)
	}

	divide([x, y]: SupportedPointMathTypes){
		return new RoundedCorner(
			[this.sx / x, this.sy / y],
			[this.x / x, this.y / y],
			[this.ex / x, this.ey / y]
		)
	}

	rotateAround(point: SupportedPointMathTypes, angle:number){
		return new RoundedCorner(
			Point.px(this.sx, this.sy).rotateAround(point, angle),
			Point.px(this.x, this.y).rotateAround(point, angle),
			Point.px(this.ex, this.ey).rotateAround(point, angle)
		)
	}

	toString(){ return `${Point.toString([this.sx, this.sy])} Q ${Point.toString([this.x, this.y])} ${Point.toString([this.ex, this.ey])}`;}
}

export default RoundedCorner;