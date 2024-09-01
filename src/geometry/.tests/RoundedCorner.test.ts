import Point from "../Point";
import RoundedCorner from "../RoundedCorner";

describe("Test the rounded corner class to ensure it works properly", ()=>{

	test("Test rounded corner initializer", ()=>{
		const corner = new RoundedCorner(Point.zero, Point.px(1,1), Point.px(2,2));
		expect(corner).toStrictEqual([1, 1, 0,0, 2, 2]);
	});

	test("Test rounded corner getters", () => {
		const corner = new RoundedCorner([2,3], [0,1], [4,5]);
		expect(corner.x).toBe(0);
		expect(corner.y).toBe(1);
		expect(corner.sx).toBe(2);
		expect(corner.sy).toBe(3);
		expect(corner.ex).toBe(4);
		expect(corner.ey).toBe(5);
		expect(corner.control).toStrictEqual([0,1]);
	});

	test("Test rounded corner setters", () => {
		const corner = new RoundedCorner(Point.zero, Point.zero, Point.zero);
		corner.x = 0;
		corner.y = 1;
		corner.sx = 2;
		corner.sy = 3;
		corner.ex = 4;
		corner.ey = 5;
		expect(corner).toStrictEqual([0,1,2,3,4,5]);
	});

	test("Test rounded corner add method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1])
		.add([2,2]);
		expect(corner).toStrictEqual([3,2,2,2,3,3]);
	});

	test("Test rounded corner adding method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1]);
		corner.adding([2,2]);
		expect(corner).toStrictEqual([3,2,2,2,3,3]);
	});

	test("Test rounded corner add scalar method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1])
		.addScalar(2);
		expect(corner).toStrictEqual([3,2,2,2,3,3]);
	});

	test("Test rounded corner subtract method", () => {
		const corner = new RoundedCorner([2,2], [3,2], [3,3])
		.subtract([2,2])
		expect(corner).toStrictEqual([1,0,0,0,1,1]);
	});

	test("Test rounded corner subtracting method", () => {
		const corner = new RoundedCorner([2,2], [3,2], [3,3]);
		corner.subtracting([2,2])
		expect(corner).toStrictEqual([1,0,0,0,1,1]);
	});

	test("Test rounded corner subtract Scalar method", () => {
		const corner = new RoundedCorner([2,2], [3,2], [3,3])
		.subtractScalar(2)
		expect(corner).toStrictEqual([1,0,0,0,1,1]);
	});

	test("Test rounded corner multiply method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1])
		.multiply([2,2])
		expect(corner).toStrictEqual([2,0,0,0,2,2]);
	});

	test("Test rounded corner multiplying method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1]);
		corner.multiplying([2,2]);
		expect(corner).toStrictEqual([2,0,0,0,2,2]);
	});

	test("Test rounded corner multiply scalar method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1])
		.multiplyScalar(2);
		expect(corner).toStrictEqual([2,0,0,0,2,2]);
	});

	test("Test rounded corner divide method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1])
		.divide([2,2]);
		expect(corner).toStrictEqual([0.5,0,0,0,0.5,0.5]);
	});

	test("Test rounded corner divide method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1]);
		corner.dividing([2,2]);
		expect(corner).toStrictEqual([0.5,0,0,0,0.5,0.5]);
	});

	test("Test rounded corner divide method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1])
		.divideScalar(2);
		expect(corner).toStrictEqual([0.5,0,0,0,0.5,0.5]);
	});

	test("Test rotate Around", () => {
		const corner = new RoundedCorner([0,0],[1,0],[1,1])
		.rotateAround(Point.zero, Math.PI/2)
		.precision(5)
		expect(corner).toStrictEqual([ 1, -1, 0, 0, 2, 0 ]);
	});

	test("Test to string method", () => {
		const corner = new RoundedCorner([0,0], [1,0], [1,1]);
		expect(''+corner).toBe('0, 0 Q 1, 0 1, 1');
	});

	test("Test to array method", ()=>{
		const corner = new RoundedCorner([0,0], [1,0], [1,1]);
		expect(corner.toArray()).toStrictEqual([1,0,0,0,1,1])
	});

});