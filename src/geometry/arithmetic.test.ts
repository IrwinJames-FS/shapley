import Arithmetic from "./arithmetic";

describe("Test methods made available via the Arithmetic method", ()=>{
	test("Test the floor method", ()=>{
		const pi = '3.141592653589793';
		for(let i = 14; i>=0; i--){
			expect(Arithmetic.floor(Math.PI, i===0 ? undefined:i)).toBe(parseFloat(pi.slice(0, 2+i)));
		}
	});

	test("Test the ceil method", ()=>{
		const vals = [
			4,
			3.2,
			3.15,
			3.142,
			3.1416,
			3.1416,
			3.141593,
			3.1415927,
			3.14159266,
			3.141592654,
			3.1415926536,
			3.14159265359,
			3.14159265359,
			3.1415926535898,
			3.1415926535898,
		];
		for(let i = 14; i>=0; i--){
			expect(Arithmetic.ceil(Math.PI, i===0 ? undefined:i)).toBe(vals[i])
			
		}
	});

	test("Test the round method", ()=>{
		const vals = [
			3,
			3.1,
			3.14,
			3.142,
			3.1416,
			3.14159,
			3.141593,
			3.1415927,
			3.14159265,
			3.141592654,
			3.1415926536,
			3.14159265359,
			3.14159265359,
			3.1415926535898,
			3.14159265358979,
		];
		for(let i = 14; i>=0; i--){

			expect(Arithmetic.round(Math.PI, i === 0 ? undefined:i)).toBe(vals[i]);
		}
	});

	test("Test to radian method", ()=>{
		expect(Arithmetic.toRadian(180)).toBe(Math.PI);
	});

	test("Test to degree method", ()=>{
		expect(Arithmetic.toDegree(Math.PI)).toBe(180);
	})
});