import Command, { isCommandChar } from "./Command"

describe(`Test the Command class`, ()=>{
	test(`Test the command initializer`, () => {
		const h = new Command("H", function*(){ yield [100]; });
		const z = new Command("Z")
		
		const m = new Command("m", function*(){
			yield [50,0];
			yield [100,100];
			yield [0,100];
		});
		const l = new Command("L", function*(){
			yield [100,100];
			yield [0,100];
		});
		const s = new Command("S", function*(){
			yield [25,100,75,100];
		});
		const c = new Command("C", function*(){
			yield [0,1,2,3,4,5];
		});
		const a = new Command("A", function*(){
			yield [0,1,2,3,4,5,6];
		})
		expect(''+h).toBe("H 100");
		expect(''+z).toBe("Z");
		expect(''+m).toBe("m 50,0 100,100 0,100");
		expect(''+l).toBe("L 100,100 0,100");
		expect(''+s).toBe("S 25,100 75,100");
		expect(''+c).toBe("C 0,1 2,3 4,5");
		expect(''+a).toBe("A 0 1 2 3 4 5,6");
		expect(()=>{
			//@ts-ignore
			return ''+new Command("M", function*(){ yield [50,0,100]})
		}).toThrow()
	});

	test(`Test isCommandChar`, ()=>{
		const chars = 'abcdefghijklmnopqrstuvwxyz';

		const cmdis = new Set([0,2,7,11,12,16,18,19,21,25]);
		const expected = new Array(26).fill(false).map((_, i)=>cmdis.has(i));
		const a = chars.split('').map(isCommandChar);
		const b = chars.toUpperCase().split('').map(isCommandChar);
		expect(a).toStrictEqual(expected);
		expect(b).toStrictEqual(expected);
	})
})