import { round, toDeg, toRad } from "../arithmetic";

describe("Test the methods provided by arithmetic", ()=>{

	test("Test the round method", ()=>{
		const a = 0.0123456789;
		expect(round(a, 0)).toBe(0);
		expect(round(a, 1)).toBe(0);
		expect(round(a, 2)).toBe(0.01);
		expect(round(a, 3)).toBe(0.012);
		expect(round(a, 4)).toBe(0.0123);
		expect(round(a, 5)).toBe(0.01235);
		expect(round(a, 6)).toBe(0.012346);
		expect(round(a, 7)).toBe(0.0123457);
		expect(round(a, 8)).toBe(0.01234568);
		expect(round(a, 9)).toBe(0.012345679);
		expect(round(a, 10)).toBe(0.0123456789);
	});

	test("Test toDeg to ensure it converts radians accurately", ()=>{
		const a = toDeg(Math.PI);
		expect(a).toBe(180);
	});

	test("Test toRad to ensure it converts degrees to radians appropriately", ()=>{
		const a = toRad(180);
		expect(a).toBe(Math.PI);
	})
})