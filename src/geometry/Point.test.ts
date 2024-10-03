import { Point } from "./Point";

describe("Test the Point class", () => {
	test("Test the default Point initializer", () => {
		const point = new Point(0, 1);
		const morePoint = new Point(0, 0, 0, 0, 0, 0);
		const noPoint = new Point();
		expect([...point]).toStrictEqual([0,1]);
		expect([...morePoint]).toStrictEqual([0, 0, 0, 0, 0, 0]);
		expect([...noPoint]).toStrictEqual([0, 0]);
	});

	test("Test the standardize method", () => {
		const point = new Point();
		const pta = point.standardize(1);
		const ptb = point.standardize([]);
		const ptc = point.standardize([], 1);

		expect(pta).toStrictEqual([1,1]);
		expect(ptb).toStrictEqual([0,0]);
		expect(ptc).toStrictEqual([1,1]);
	});

	test("Test the eachWithArgs Iterator method", () => {
		const point = new Point(1,2,3,4,5,6,7,8,9,10);
		const res = [
			[0, 1, 1],
			[1, 2, 2],
			[2, 1, 3],
			[3, 2, 4],
			[4, 1, 5],
			[5, 2, 6],
			[6, 1, 7],
			[7, 2, 8],
			[8, 1, 9],
			[9, 2, 10]
		]
		let i = 0;
		for(const r of point.eachWithArgs([1,2])){
			expect(r).toStrictEqual(res[i]);
			i++;
		}
	});

	test("Test the clone method", () => {
		const point = new Point()
		const b = point.clone();
		b[0] = 1;
		b[1] = 2;
		expect([...b]).toStrictEqual([1,2]);
		expect([...point]).toStrictEqual([0,0]);
	});

	test("Test the add method", () => {
		const point = new Point().add([1,2]);
		expect([...point]).toStrictEqual([1,2]);
	});

	test("Test the subtract method", () => {
		const point = new Point(2,4).subtract([1,2]);
		expect([...point]).toStrictEqual([1,2]);
	});

	test("Test the multiply method", () => {
		const point = new Point(2,1).multiply([1,2]);
		expect([...point]).toStrictEqual([2,2]);
	});

	test("Test the divide method", () => {
		const point = new Point(2,1).divide([2,1]);
		expect([...point]).toStrictEqual([1,1]);
	});

	test("Test the pow method", () => {
		const point = new Point(2, 2).pow(2);
		expect([...point]).toStrictEqual([4,4]);
	});

	test("Test the sum method", () => {
		const sum = new Point(2,2).sum();
		expect(sum).toBe(4);
	});

	test("Test the ray method", () => {
		const point = new Point().ray(0, 1);
		expect([...point]).toStrictEqual([0,1]);
	});

	test("Test the distance method", () => {
		const point = new Point(0, 0);
		const distance = point.distance([0,1]);
		expect(distance).toBe(1);
	});

	test("Test bival iterator", () => {
		const res = [[1,2],[3,4],[5,6],[7,8],[9,0]];
		let i = 0;
		for(const p of new Point(1,2,3,4,5,6,7,8,9).bivalIterator()){
			expect(p).toStrictEqual(res[i]);
			i++;
		}
	});

	test("Test floor method", () => {
		const point = new Point(Math.PI, Math.PI)
		point.floor(1);
		expect(point[0]).toBe(3.1);
	});

	test("Test ceil method", () => {
		const point = new Point(Math.PI, Math.PI)
		point.ceil(1);
		expect(point[0]).toBe(3.2);
	});

	
});