import Points from "../Points";

describe("Test Points class to ensure its working properly", ()=>{
	test("Test Points Point Initialization Method", ()=>{
		const points = new Points([
			0.5, 0,
			0, 1,
			1, 1
		]);
		expect(''+points).toBe("M 0.5, 0 L 0, 1 L 1, 1z");
	});

	test("Test from circle initializer", ()=>{
		const points = Points.fromCircle(3, Math.PI)
		expect(''+points).toBe("M 0, -0.5 L -0.43301, 0.25 L 0.43301, 0.25z");
	});

	test("Test rounding corners", ()=>{
		const points = new Points([
			0.5, 0,
			0, 1,
			1, 1
		])
		.round(0.1);
		expect(''+points).toBe("M 0.04472, 0.91056 Q 1, 1 0.1, 1 L 0.9, 1 Q 1, 1 0.95528, 0.91056 L 0.54472, 0.08944 Q 0.5, 0 0.45528, 0.08944z");
	});
});