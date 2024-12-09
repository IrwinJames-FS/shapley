import { ray, stride, toPrecision } from "./utils";

describe(`Test the utility functions`, () => {
	test(`Test the stride method`, ()=>{
		const arrs = new Array(100).fill(0).map((_, i)=>i);
		let i = 0;
		for(const a of stride(arrs, 0)) throw new Error("This stride should not occur");
		for (const [a,b] of stride(arrs, 2)){
			expect(a).toBe(i);
			expect(b).toBe(i+1);
			i+=2
		}

		expect(()=>{
			for(const [a,b,c] of stride(arrs, 3));
		}).toThrow();
	});

	test(`Test the toPrecision method`, ()=>{
		const a = toPrecision(Math.PI);
		const b = toPrecision(0.00000001);
		const c = toPrecision(1.5, 0);
		expect(a).toBe(3.141592);
		expect(b).toBe(0);
		expect(c).toBe(1);
		expect(toPrecision(0)).toBe(0);
	});

	test(`Test the ray method`, ()=>{
		const q = Math.PI/2;
		const a = ray(1,0);
		const b = ray(1, q);
		const c = ray(1, Math.PI);
		const d = ray(1, q*3);
		expect(a).toStrictEqual([1,0]);
		expect(b).toStrictEqual([0,1]);
		expect(c).toStrictEqual([-1,0]);
		expect(d).toStrictEqual([0,-1]);
	});
});