import { Gen } from "./Gen"

describe(`Test the Gen class methods`, () => {
	test(`Test the Gen initializer`, () => {
		const gen = new Gen(function*(){
			yield 0;
			yield 1;
			yield 2;
			yield 3;
			yield 4;
			yield 5;
			yield 6;
			yield 7;
			yield 8;
			yield 9;
		})
		let i = 0;
		for(const j of gen.each()){
			expect(i).toBe(j);
			i++;
		}
	});

	test(`Test the Gen apply method`, () => {
		const gen = new Gen<number>(function*(){
			yield 0;
			yield 1;
			yield 2;
			yield 3;
			yield 4;
			yield 5;
			yield 6;
			yield 7;
			yield 8;
			yield 9;
		});
		gen.apply(g=>function*(){
			for(const n of g()) yield n+2;
		});
		let i = 2;
		for(const j of gen.each()){
			expect(j).toBe(i);
			i++;
		}
	});

	test(`Test the Gen flatten method`, () => {
		let total = 0;
		const gen = new Gen<number>(function*(){
			total++;
			yield 0;
			yield 1;
			yield 2;
			yield 3;
			yield 4;
			yield 5;
			yield 6;
			yield 7;
			yield 8;
			yield 9;
		});
		gen.apply(g=>function*(){
			total++;
			for(const n of g()){
				
				yield n+2;
			}
		}).flatten();

		let i = 2;
		for(const n of gen.each()) {
			expect(i).toBe(n);
			i++;
		}
		i = 2;
		for(const n of gen.each()) {
			expect(i).toBe(n);
			i++;
		}

		expect(total).toBe(2);
	})
})