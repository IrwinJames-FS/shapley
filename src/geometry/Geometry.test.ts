import { Geometry } from "./Geometry";
import { Point } from "./Point";

describe("Test the Geometry class", () => {
	test("Test the bufferGenerator static method", () => {
		const res = [[0,0],[1,0], [1,1], [0,1]];
		let i = 0;
		for(const p of Geometry.bufferGenerator([0,0,1,0,1,1,0,1])()){
			expect([...p]).toStrictEqual(res[i]);
			i++;
		}
	});

	test("Test an invalid bufferGenerator arguments", () => {
		try{
			expect(Geometry.bufferGenerator([0])).toThrow();
		} catch {}
	});

	test("Test the pointGenerator static method", () => {
		const res = [
			new Point(0, 0),
			new Point(1, 0),
			new Point(1, 1),
			new Point(0, 1)
		];
		let i = 0;
		for(const p of Geometry.pointGenerator(res)()){
			expect(p).toStrictEqual(res[i]);
			expect(p === res[i]).toBe(true);
			i++;
		}
	});

	test("Test the pointGenerator static method", () => {
		const res = [
			new Point(0, 0),
			new Point(1, 0),
			new Point(1, 1),
			new Point(0, 1)
		];
		let i = 0;
		for(const p of Geometry.clonedPointGenerator(res)()){
			expect(''+p).toStrictEqual(''+res[i]);
			expect(p === res[i]).toBe(false);
			i++;
		}
	});

	test("Test the fromBuffer method", () => {
		const geometry = Geometry.fromBuffer([0,1,2,3,4,5,6,7,8,9]);
		const res = [[0,1],[2,3],[4,5],[6,7],[8,9]];
		let i = 0;
		for(const p of geometry.generator()) {
			expect([...p]).toStrictEqual(res[i])
			i++;
		}
	});

	test("Test the fromPoints method", () => {
		const geometry = Geometry.fromPoints([
			new Point(0,1),
			new Point(2,3),
			new Point(4,5),
			new Point(6,7),
			new Point(8,9)
		]);
		const res = [[0,1],[2,3],[4,5],[6,7],[8,9]];
		let i = 0;
		for(const p of geometry.generator()) {
			expect([...p]).toStrictEqual(res[i])
			i++;
		}
	});

	test("Test the fromCircle method", () => {
		const geometry = Geometry.fromCircle(4).round(2);
		const res = [[0,0.5],[0.5,0],[0,-0.5],[-0.5, -0]];
		let i = 0;
		for(const p of geometry.generator()){
			expect([...p]).toStrictEqual(res[i]);
			i++;
		}
	});

	test("Test the fromCircle method", () => {
		const geometry = Geometry.fromCircle(4).round(2);
		const res = [[0,0.5],[0.5,0],[0,-0.5],[-0.5, -0]];
		let i = 0;
		for(const p of geometry.generator()){
			expect([...p]).toStrictEqual(res[i]);
			i++;
		}
	});

	test("Test clonePoints method", () => {
		const geometry = Geometry.fromCircle(4);
		const cloned = geometry.clonePoints().round(2)
		expect(geometry.toPoints()).not.toStrictEqual(cloned.toPoints());
	});
	
	test("Test the translate method", () => {
		const geometry = Geometry.fromCircle(4).round(2).translate(0.5)
		const res = [[0.5, 1], [1, 0.5], [0.5, 0], [0, 0.5]];
		expect(geometry.toArrays()).toStrictEqual(res);
	});

	test("Test the translate method", () => {
		const geometry = Geometry.fromCircle(4).round(2).scale(2)
		const res = [[0, 1], [1, 0], [0, -1], [-1, -0]];
		expect(geometry.toArrays()).toStrictEqual(res);
	});

	test("Test the round method", () => {
		const geometry = Geometry.fromBuffer(new Array(8).fill(Math.PI)).round(1);
		const res = new Array(4).fill([3.1,3.1]);
		expect(geometry.toArrays()).toStrictEqual(res);
	});

	test("Test the floor method", () => {
		const geometry = Geometry.fromBuffer(new Array(8).fill(Math.PI)).floor(1);
		const res = new Array(4).fill([3.1,3.1]);
		expect(geometry.toArrays()).toStrictEqual(res);
	});

	test("Test the ceil method", () => {
		const geometry = Geometry.fromBuffer(new Array(8).fill(Math.PI)).ceil(1);
		const res = new Array(4).fill([3.2,3.2]);
		expect(geometry.toArrays()).toStrictEqual(res);
	});

	test("Test toString method", () => {
		const geometry = Geometry.fromCircle(4).round(1);
		console.log(''+geometry);
	})
});