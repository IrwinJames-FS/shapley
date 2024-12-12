import Command from "./Command";
import D from "./D"

describe(`Test D functionality`, () => {
	test(`Test D string initializer`, () => {
		const d = new D("M 50,0 100,100 0,100 z");
		//slightly more forgiving then svg syntax
		const d1 = new D("M50,0,100,100X0X100z");
		expect(''+d).toBe("M 50,0 100,100 0,100 z");
		expect(''+d1).toBe("M 50,0 100,100 0,100 z");
	});

	test(`Test D number array initializer`, () => {
		const d = new D([50,0,100,100,0,100]);
		expect(''+d).toBe("M 50,0 100,100 0,100 z");
	});

	test(`Test D CMD[] initializer`, ()=>{
		const d = new D([
			new Command("M", function*(){
				yield [50,0];
			}),
			new Command("L", function*(){
				yield [100,100];
				yield [0,100];
			}),
			new Command("Z")
		]);
		expect(''+d).toBe("M 50,0 L 100,100 0,100 Z");
	});

	test(`Test D Generator initializer`, ()=>{
		const d = new D(function*(){
			yield new Command("M", function*(){
				yield [50,0];
				yield [100,100];
				yield [0,100];
			});
			yield new Command("z")
		});
		expect(''+d).toBe("M 50,0 100,100 0,100 z");
	});

	test(`Test Invalid D initializer`, ()=>{
		expect(()=>{
			const d = new D("M 50,0 100");
			console.log(''+d);
		}).toThrow();
	})

	test(`Test unsupported D generator initializer`, ()=>{
		//@ts-ignore
		const d = new D(["M 50,0 100,100 0,100z"])
		expect(''+d).toBe('');
	});

	test(`Test single chars`, ()=>{
		const d = new D("M 0,0 H 100 V 100 H 0z")
		expect(''+d).toBe("M 0,0 H 100 V 100 H 0 z");
		//expect(d.viewBox).toBe('0 0 100 100');
	})

	test(`Test ViewBox functionality`, ()=>{
		const d = new D("M 50,0 100,100 0,100z");
		d.toString();
		const d1 = new D("m 50,0 50,100 -100,0z");
		d1.toString();
		//expect(d.viewBox).toBe('0 0 100 100');
		//expect(d1.viewBox).toBe('0 0 100 100');
	})
});