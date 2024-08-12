import { add, divide, multiply, multiplyScalar, ray, subtract } from "./psimd";

describe("Check that psimd methods are working properly", ()=>{
	test("Ensure the add function works as expected", () => {
		const a = add([1,1], [1,1,1]);
		const b = add([1,1,1], [1,1]);
		expect(a.length).toBe(2);
		expect(a).toStrictEqual([2,2]);
		expect(b.length).toBe(3);
		expect(b).toStrictEqual([2,2,1]);
	});

	test("Ensure the subtract function works as expected", ()=>{
		const a = subtract([1,1], [1,1,1]);
		const b = subtract([1,1,1], [1,1]);
		expect(a.length).toBe(2);
		expect(a).toStrictEqual([0,0]);
		expect(b.length).toBe(3);
		expect(b).toStrictEqual([0,0,1]);
	});
	
	test("Ensure the multiply function works as expected", ()=>{
		const a = multiply([1,1], [2,2,2]);
		const b = multiply([1,1,1], [2,2])
		expect(a.length).toBe(2);
		expect(a).toStrictEqual([2,2]);
		expect(b.length).toBe(3);
		expect(b).toStrictEqual([2,2,1]);
	});

	test("Ensure divide function works as expected", ()=>{
		const a = divide([4,4], [2,2,2]);
		const b = divide([4,4,4], [2,2])
		expect(a.length).toBe(2);
		expect(a).toStrictEqual([2,2]);
		expect(b.length).toBe(3);
		expect(b).toStrictEqual([2,2,4]);
	});

	test("Ensure the ray function works as expected", ()=>{
		const a = ray(1,0);
		const b = ray(1,0,[0,0]);
		expect(a.length).toBe(3);
		expect(a).toStrictEqual([0, 1, 0]);
		expect(b.length).toBe(3);
		expect(b).toStrictEqual([0,1,0]);
	});

	test("Test the multiplyScalar function works as expected", ()=>{
		const a = multiplyScalar([1,1,1], 2);
		expect(a.length).toBe(3);
		expect(a).toStrictEqual([2,2,2]);
	});
});