import PathCommand, { ArcValueCommand, BiValueCommand, ClosingCommand, HexaValueCommand, parseD, QuadValueCommand, SingleValueCommand } from "./PathCommand";
describe(`Test the path command functionality`, () => {
	test(`Test the Single Value command initializer`, ()=>{
		const cmd = new SingleValueCommand("h", 0, 0, 1, 2, 3, 4);
		expect(''+cmd).toBe('h 0 0 1 2 3 4');
	});

	test(`Test the BiValueCommand initializer`, () => {
		const cmd = new BiValueCommand("L", 0, 0, 1, 2, 3,4);
		expect(''+cmd).toBe('L 0,0 1,2 3,4');
	});

	test(`Test the QuadValueCommand initializer`, () => {
		const cmd = new QuadValueCommand("S", 0, 0, 1, 2);
		expect(''+cmd).toBe('S 0,0 1,2');
	});

	test(`Test the HexaValueCommand initializer`, ()=>{
		const cmd = new HexaValueCommand("C", 0, 0, 1, 2, 3, 4);
		expect(''+cmd).toBe("C 0,0 1,2 3,4");
	});

	test(`Test the ArcValueCommand initializer`, () => {
		const cmd = new ArcValueCommand("A", 1,1, 1, 1,1, 2,2);
		expect(''+cmd).toBe("A 1 1 1 1 1 2,2")
	});

	test(`Test an invalid declaration`, () =>{
		expect(()=>{
			new BiValueCommand("M", 0,1,2)
		}).toThrow();
	});

	test(`Test the ClosingCommand initializer`, ()=>{
		const cmd = new ClosingCommand("z");
		expect(''+cmd).toBe("z");
	});

	test(`Test parse D method`, () => {
		expect(Array.from(parseD("M 0, 0 V 10 H 10 L 10, 10 T 20, 20 S 30, 30 10, 10 Q 20, 20, 40, 40 C 10, 10 20, 20, 30,30 A 1 2 3 4 5 6 7 Z")).join(' ')).toBe("M 0,0 V 10 H 10 L 10,10 T 20,20 S 30,30 10,10 Q 20,20 40,40 C 10,10 20,20 30,30 A 1 2 3 4 5 6,7 Z");
		expect(Array.from(parseD("M 0, 0 V 10 H 10 L 10, 10 T 20, 20 S 30, 30 10, 10 Q 20, 20, 40, 40 C 10, 10 20, 20, 30,30 A 1 2 3 4 5 6 7 Z".toLowerCase())).join(' ')).toBe("M 0,0 V 10 H 10 L 10,10 T 20,20 S 30,30 10,10 Q 20,20 40,40 C 10,10 20,20 30,30 A 1 2 3 4 5 6,7 Z".toLowerCase());
	})
});