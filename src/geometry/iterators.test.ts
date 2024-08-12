import { aspect, boundingBox, normalize, normalizedPolygon, polygon, rounded, translate } from "./iterators";

describe("Test Iterators", ()=>{
	test("Test polygon iterator", ()=>{
		const buffer: number[] = []
		for(const p of polygon(3, 0)()){
			expect(p.length).toBe(3);
			buffer.push(parseFloat(p[0].toFixed(2)), parseFloat(p[1].toFixed(2)));
		}
		
		expect(buffer.length).toBe(6);
		expect(buffer).toStrictEqual([
			0,1,
			0.87,-0.5,
			-0.87, -0.5
		])
	});


	test("Test the translate iterator", ()=>{
		const buffer: number[] = []
		const poly = polygon(3,0)();

		for(const p of translate(poly, [1,1])){
			expect(p.length).toBe(3);
			buffer.push(parseFloat(p[0].toFixed(2)), parseFloat(p[1].toFixed(2)));
		}
		expect(buffer.length).toBe(6);
		expect(buffer).toStrictEqual([
			1,2,
			1.87,0.5,
			0.13, 0.5
		]);
	});

	test("Test the normalize iterator this will also test the boundingBox method", ()=>{
		const buffer: number[] = [];
		const poly = polygon(3,0);
		const bounding = boundingBox(poly());
		for(const p of normalize(poly(), bounding)){
			expect(p.length).toBe(3);
			buffer.push(parseFloat(p[0].toFixed(2)), parseFloat(p[1].toFixed(2)));
		}
		expect(buffer.length).toBe(6);
		expect(buffer).toStrictEqual([
			0.5, 1,
			1,0,
			0, 0
		]);
	});

	test("Test the normalizedPolygon iterator this", ()=>{
		const buffer: number[] = [];
		const poly = normalizedPolygon(3,0);
		
		for(const p of poly){
			expect(p.length).toBe(3);
			buffer.push(parseFloat(p[0].toFixed(2)), parseFloat(p[1].toFixed(2)));
		}
		expect(buffer.length).toBe(6);
		expect(buffer).toStrictEqual([
			0.5, 1,
			1,0,
			0, 0
		]);
	});

	test("Test the rounded function with static border", ()=>{
		const buffer: number[] = [];
		const poly = rounded(normalizedPolygon(3,0), 0.1);
		
		for(const [p] of poly){
			expect(p.length).toBe(3);
			buffer.push(parseFloat(p[0].toFixed(2)), parseFloat(p[1].toFixed(2)));
		}
		expect(buffer.length).toBe(6);
		expect(buffer).toStrictEqual([
			1,0,
			0, 0,
			0.5, 1,
		]);
	});

	test("Test the rounded function with declared border border", ()=>{
		const buffer: number[] = [];
		const poly = rounded(normalizedPolygon(3,0), [0.1, 0.2]);
		
		for(const [p] of poly){
			expect(p.length).toBe(3);
			buffer.push(parseFloat(p[0].toFixed(2)), parseFloat(p[1].toFixed(2)));
		}
		expect(buffer.length).toBe(6);
		expect(buffer).toStrictEqual([
			1,0,
			0, 0,
			0.5, 1,
		]);
	});

	test("Test the aspect function", () => {
		const boundA = boundingBox(polygon(6, 0)());
		const boundB = boundingBox(polygon(6, 30)());
		const a = aspect(boundA);
		const b = aspect(boundB);
		expect(a).toBe('0.8660254037844388 / 1');
		expect(b).toBe('1 / 0.9440853798652663');
	});
});