import ngon, { $d } from "./ngon";

describe("Testing the ngon method", ()=>{
	test("Testing that ngon generates valid information", ()=>{
		const a = ngon(3, 0, 0.0);
		const b = ngon(3, 0, 0.1);
		expect(a.length).toBe(3);
		expect(b.length).toBe(3);
	});

	test("Test that a square ngon does not normalize", ()=>{
		const a = ngon(3, 0, 0, true);
		expect(a.length).toBe(3);
	});

	test("Test that $d works as expected", ()=>{
		const a = $d`M ${[0,0]} L ${[0,1]} L ${[1,1]} ${1}z`;
		expect(a).toBe('M 0.00000, 0.00000 L 0.00000, 1.00000 L 1.00000, 1.00000 1.00000z');
	});
})