import { info, ray, rollingThree, stride, toPrecision } from "./utils";

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

	test(`Test the info method`, ()=>{
		const q = Math.PI/2;
		
		const [a1, d1] = info([0,0], ray(1, 0));
		const [a2, d2] = info([0,0], ray(1, q));
		const [a3, d3] = info([0,0], ray(1, Math.PI));
		const [a4, d4] = info([0,0], ray(1, q*3));

		expect(a1).toBe(0);
		expect(d1).toBe(1);
		expect(a2).toBe(q);
		expect(d2).toBe(1);
		expect(a3).toBe(Math.PI);
		expect(d3).toBe(1);
		expect(a4).toBe(q*3);
		expect(d4).toBe(1);
	});

	test(`Test the rollingThree`, ()=>{
		for(const p of rollingThree(stride([0,0], 2))) console.log(p);
	});
});
