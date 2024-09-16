import Arithmetic from "./arithmetic";
import { Point } from "./Point";

describe("Test the Point class to ensure it works as expected", ()=>{
	test("Test Point Initialization method", ()=>{
		const point = new Point(0,1);
		const zeroPoint = new Point();
		expect(point.x).toBe(0);
		expect(point.y).toBe(1);
		expect(point.cmd).toBe("L");
		expect(zeroPoint.toArray()).toStrictEqual([0,0])
	});

	test("Test Point Angle method", () => {
		const a = Point.zero();
		const b = a.clone().add(1);
		const angle = a.angle(b);
		const angleB = a.angle([]); //Should result in zero I think.
		const degree = Arithmetic.toDegree(angle);
		expect(degree).toBe(45);
		expect(angleB).toBe(0);
	});

	test("Test Point distance method", () => {
		const a = Point.zero();
		const b = a.clone().add([1]);
		const c = a.clone().add([0, 1]);
		const distB = a.distance(b);
		const distC = a.distance(c);
		const distD = a.distance([]);
		expect(distB).toBe(1);
		expect(distC).toBe(1);
		expect(distD).toBe(0);
	});

	test("Test Point pow method", ()=>{
		const a = new Point(2, 2);
		expect(a.pow([2]).toArray()).toStrictEqual([4,2])
	})
	test("Test Point add method", () => {
		const a = Point.zero().add(1);
		const b = Point.zero().add([1]);
		const c = Point.zero().add(new Point(1,1));
		expect(a.toArray()).toStrictEqual([1,1]);
		expect(b.toArray()).toStrictEqual([1,0]);
		expect(c.toArray()).toStrictEqual([1,1]);
	});

	test("Test Point subtract method", () => {
		const a = new Point(1,1).subtract(1);
		const b = new Point(1,1).subtract([1]);
		expect(a.equals(0)).toBe(true);
		expect(b.equals([0,1])).toBe(true);
	});

	test("Test Point multiply method", ()=>{
		const a = new Point(2,3).multiply(4);
		const b = new Point(2,3).multiply([4]);
		expect(a.toArray()).toStrictEqual([8,12]);
		expect(b.toArray()).toStrictEqual([8,3]);
	});

	test("Test Point divide method", () => {
		const a = new Point(8,12).divide(4);
		const b = new Point(8,12).divide([4]);
		expect(a.toArray()).toStrictEqual([2,3]);
		expect(b.toArray()).toStrictEqual([2,12]);
	});

	test("Test Point min method", ()=>{
		const a = new Point(100, 12).min([9, 15]);
		const b = new Point(100, 12).min([10]);
		expect(a.toArray()).toStrictEqual([9,12]);
		expect(b.toArray()).toStrictEqual([10,0]);
	});

	test("Test Point max method", ()=>{
		const a = new Point(100, 12).max([9, 15]);
		const b = new Point(100, 12).max([101]);
		
		expect(a.toArray()).toStrictEqual([100,15]);
		expect(b.toArray()).toStrictEqual([101,12]);
	});

	test("Test Point floor method", ()=>{
		const a = new Point(1.95, 2.32).floor(1);
		const b = a.clone().floor();
		expect(a.toArray()).toStrictEqual([1.9, 2.3]);
		expect(b.toArray()).toStrictEqual([1, 2]);
	});

	test("Test Point ceil method", () => {
		const a = new Point(1.95, 2.32);
		const b = a.clone().ceil();
		expect(a.ceil(1).toArray()).toStrictEqual([2, 2.4]);
		expect(b.toArray()).toStrictEqual([2, 3]);
	});

	test("Test Point round method", ()=>{
		const a = new Point(1.95, 2.32);
		const b = a.clone().round();
		expect(a.round(1).toArray()).toStrictEqual([2, 2.3]);
		expect(b.toArray()).toStrictEqual([2, 2]);
	});

	test("Test Point setPosition method", ()=>{
		const a = new Point(1,1).setPosition([]);
	})
	test("Test Point rotateAround method", () => {
		const a = new Point(0, -1);
		const b = a.clone().rotateAround(Point.zero(), Math.PI).round();
		expect(b.toArray()).toStrictEqual([-0,1])
	})
	test("Test Point equals method", () => {
		const a = Point.zero().equals([]);
		expect(a).toBe(true);
	});

	test("Test toString method", ()=>{
		const a = new Point(1,2, "M");
		const b = new Point(3, 4);
		expect(''+a).toBe('M 1, 2');
		expect(''+b).toBe('L 3, 4');
	});

	test("Test the simplify method", ()=>{
		const a = new Point(12, 8);
		expect(a.simplify().toArray()).toStrictEqual([3,2]);
	});
});