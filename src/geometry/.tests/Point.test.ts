import { round } from "../arithmetic";
import Point from "../Point";

describe("Test the Point class to ensure it works as designed", () => {
	test("Test Point Declaration", () => {
		const p = new Point(0, 0);
		const b = Point.zero;
		expect(p).toStrictEqual([0, 0]);
		expect(b).toStrictEqual([0,0]);
	});

	test("Test Point Addition works as designed", ()=>{
		const a = new Point(1, 5);
		const c = a.add([6,2]);
		expect(c).toStrictEqual([7,7]);
	});

	test("Test Point Addition works as designed", ()=>{
		const a = new Point(1, 5)
		.adding([6,2]);
		expect(a).toStrictEqual([7,7]);
	});

	test("Test Point Addition of Scalar method", ()=>{
		const a = new Point(2, 2)
		.addScalar(5);
		expect(a).toStrictEqual([7,7])
	});

	test("Test Point Ray Method", ()=>{
		const a = Point.zero.ray(0, 1);
		const b = Point.zero.rayDeg(90, 1);
		expect(a).toStrictEqual([0,1]);
		expect(b.precision(2)).toStrictEqual([1,0]);
	});

	test("Test Point Subtract method", ()=>{
		const a = Point.px(10, 10)
		.subtract([5,5]);
		expect(a).toStrictEqual([5,5]);
	});

	test("Test Point Subtract method", ()=>{
		const a = Point.px(10, 10)
		.subtracting([5,5]);
		expect(a).toStrictEqual([5,5]);
	});

	test("Test Point Subtract scalar method works", () => {
		const a = Point.px(12, 15)
		.subtractScalar(10)
		expect(a).toStrictEqual([2,5]);
	});

	test("Test Point Multiply Method", ()=>{
		const a = Point.px(2, 3)
		.multiply([10,10]);
		expect(a).toStrictEqual([20, 30]);
	});

	test("Test Point Multiplying Method", ()=>{
		const a = Point
		.px(2, 3)
		.multiplying([10, 10]);
		expect(a).toStrictEqual([20, 30]);
	});

	test("Test Point Multiply Scalar Method", ()=>{
		const a = Point
		.px(2, 3)
		.multiplyScalar(10);
		expect(a).toStrictEqual([20, 30]);
	});

	test("Test Point Divide Method", ()=>{
		const a = Point
		.px(20, 30)
		.divide([10, 10]);
		expect(a).toStrictEqual([2, 3]);
	});

	test("Test Point Dividing Method", ()=>{
		const a = Point
		.px(20, 30)
		.dividing([10, 10]);
		expect(a).toStrictEqual([2, 3]);
	});

	test("Test Point Divide Scalar Method", ()=>{
		const a = Point
		.px(20, 30)
		.divideScalar(10);
		expect(a).toStrictEqual([2, 3]);
	});

	test("Test Point Min Method", ()=>{
		const a = Point
		.px(10, 100)
		.min(Point.px(1000, 0));
		expect(a).toStrictEqual([10, 0]);
	});

	test("Test Point Max Method", ()=>{
		const a = Point
		.px(10, 100)
		.max(Point.px(1000, 0));
		expect(a).toStrictEqual([1000, 100]);
	});

	test("Test Point To Method", ()=>{
		const a = Point.zero
		.to(Point.px(1,0))

		expect(round(a.angle,5)).toBe(round(Math.PI/2,5));
	});

	test("Test Point Rotate Around Method", ()=>{
		const a = Point.px(0, 1)
		.rotateAround(Point.zero, Math.PI/2);
		expect(round(a.x, 5)).toBe(1);
		expect(round(a.y, 5)).toBe(1);
	});

	test("Test Point to String Method", ()=>{
		const s = Point.px(0,1)+'';
		expect(s).toBe('0, 1');
	})
});