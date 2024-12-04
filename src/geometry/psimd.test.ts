import psimd from "./psimd"

describe(`Test psimd to ensure it is performing the actions appropriately`, ()=>{
	test(`Test psimd initilization method`, () => {
		const p = new psimd(0, 1);
		expect([...p]).toStrictEqual([0,1]);
	});

	test(`Test psimd zero method`, ()=>{
		const a = psimd.zero();
		const b = psimd.zero(3);
		const c = psimd.zero(4);
		expect([...a]).toStrictEqual([0,0]);
		expect([...b]).toStrictEqual([0,0,0]);
		expect([...c]).toStrictEqual([0,0,0,0]);
	});

	test(`Test psimd clone method`, ()=>{
		const a = new psimd(0,0);
		const b = a.clone();
		expect([...b]).toStrictEqual([...a]);
		expect(a===b).toBeFalsy();
	});
	
	test(`Test psimd performOp method`, ()=>{
		//confirming the method handles all expected value types properly here will reduce the necessary testing of each additional operation. 

		//verify repeating pattern works properly
		const op = (a: number, b:number)=>a+b;
		const a = psimd.zero(6)
		.performOp([1,2], op);
		const b = psimd.zero()
		.performOp([2,3], op);
		const c = psimd.zero()
		.performOp(1, op);
		expect([...a]).toStrictEqual([1,2,1,2,1,2]);
		expect([...b]).toStrictEqual([2,3]);
		expect([...c]).toStrictEqual([1,1]);
	});
	
	test(`Test psimd addition method`, ()=>{
		const a = psimd.zero(6).add([1,2])
		expect([...a]).toStrictEqual([1,2,1,2,1,2]);
	});


	test(`Test psimd subtraction method`, ()=>{
		const a = psimd.zero(6).subtract([1,2])
		expect([...a]).toStrictEqual([-1,-2,-1,-2,-1,-2]);
	});

	test(`Test psimd multiply method`, ()=>{
		const a = psimd.repeating(1, 6).multiply([1,2])
		const b = psimd.repeating(2).multiply(0.5);
		expect([...a]).toStrictEqual([1,2,1,2,1,2]);
		expect([...b]).toStrictEqual([1,1]);
	});

	test(`Test psimd divide method`, () => {
		const a = new psimd(12, 24, 36, 48);
		const b = a.clone().divide([3,4]);
		expect([...a]).toStrictEqual([12,24,36,48]); //make sure a was not affected by the operation on b. 
		expect([...b]).toStrictEqual([4, 6, 12, 12])
	});

	test(`Test the stride method`, ()=>{

		const a = psimd.repeating(1, 6);
		expect(()=>{
			for(const i of a.stride(4)){}
		}).toThrow();
		let count = 0;
		for(const vals of a.stride(2)){
			expect(vals.length).toBe(2);
			count++;
		}
		
		expect(()=>{
			for(const i of a.stride(2,-1,7));
		}).toThrow();
		expect(count).toBe(3);
	})
})