import { Point } from "./Point";

describe("Test the Point class methods", () => {
	test("Test the Point initializer", () => {
		const a = new Point(undefined, 1); //just to force the optional to fill
		const b = new Point(1);
		expect([...a]).toStrictEqual([0,1]);
		expect([...b]).toStrictEqual([1,0]);
	});

	test("Test the Point x and y getters and setters", () => {
		const a = new Point();
		expect(a.x).toBe(0);
		expect(a.y).toBe(0);
		a.x = 1;
		a.y = 2;
		expect(a.x).toBe(1);
		expect(a.y).toBe(2);
	});

	test("Test the Point copy method", () => {
		const a = new Point(1,2);
		const cp = a.copy();
		expect(cp === a).toBeFalsy();
		expect([...cp]).toStrictEqual([...a]);
	});

	test("Test the Point add method", () => {
		const a = new Point().add(1);
		const b = new Point().add([1,1]);
		expect([...a]).toStrictEqual([1,1]);
		expect([...b]).toStrictEqual([1,1]);
	});

	test("Test the Point subtract method", () => {
		const a = new Point(2,2).subtract(1);
		const b = new Point(2,2).subtract([1,1]);
		expect([...a]).toStrictEqual([1,1]); 
		expect([...b]).toStrictEqual([1,1]); 
	});

	test("Test the Point multiply method", () => {
		const a = new Point(2,2).multiply(2);
		const b = new Point(2,2).multiply([2,2]);
		expect([...a]).toStrictEqual([4,4]); 
		expect([...b]).toStrictEqual([4,4]); 
	});

	test("Test the Point divide method", () => {
		const a = new Point(2,2).divide(2);
		const b = new Point(2,2).divide([2,2]);
		expect([...a]).toStrictEqual([1,1]); 
		expect([...b]).toStrictEqual([1,1]);
	});

	test("Test the Point ray method", () => {
		const a = new Point().ray(0);
		expect([...a]).toStrictEqual([0, 50]);
	});

	test("Test the Point min method", () => {
		const a = new Point(0, 10).min(5);
		const b = new Point(10,0).min([5, -1]);
		expect([...a]).toStrictEqual([0,5]);
		expect([...b]).toStrictEqual([5,-1]);
	});

	test("Test the Point max method", () => {
		const a = new Point(100, 0).max(10);
		const b = new Point(0, 10).max([100, 0])
		expect([...a]).toStrictEqual([100,10]);
		expect([...b]).toStrictEqual([100,10]);
	});

	test("Test the Point to method", () => {
		const a = new Point(0, 0).ray(0);
		const info = [Math.PI, 50];
		expect([...a.to(0)]).toStrictEqual(info);
		expect([...a.to([0,0])]).toStrictEqual(info);
	})
});