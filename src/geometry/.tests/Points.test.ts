import { round } from "../arithmetic";
import Point from "../Point";
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

	test("Test translate", () => {
		const points = Points.fromCircle(4).translate(Point.px(2,2));
		const pnts = [2,2.5,2.5,2,2,1.5,1.5,2];
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}
	});

	test("Test rotate", () => {
		const points = Points.fromCircle(4).rotate(Math.PI/2);
		const pnts = [0.5,0.5,0.5,-0.5,-0.5,-0.5, -0.5,0.5];
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}
	});

	test("Test scale", () => {
		const points = Points.fromCircle(4).scale(Point.px(2,2));
		const pnts = [0,1,1,0,0,-1,-1,-0]
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}
	});

	test("Test Normalize", () => {
		const points = Points.fromCircle(4).normalize();
		const pnts = [0.5,1,1,0.5,0.5,0,0,0.5];
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}


		
	});

	test("Test invalid geometry (from circle no stops)", ()=>{
		try{
			Points.fromCircle(0).toString();
		} catch (e) {
			expect(e.message).toBe("At least two stop must be requested");
		}
	});

	test("Test invalid geometry (from circle one stop)", ()=>{
		try{
			Points.fromCircle(1, Math.PI, Point.zero).toString();
		} catch (e) {
			expect(e.message).toBe("At least two stop must be requested");
		}
	});

	test("Test invalid geometry (from circle two stops)", ()=>{
		const points = Points.fromCircle(2).toString();
		expect(points).toBeDefined();
	});
	
	test("Test invalid geometry (single value)", () => {
		try{
			new Points([0]).round(0.1).toString();
		} catch (e) {
			expect(e.message).toBe("Invalid buffer size");
		}
		
	});
	

	test("Test invalid geometry (no points)", () => {
		const buffer = new Points([]).round(0.1).toArray()
		expect(buffer.length).toBe(0);
	});

	test("Test invalid geometry (single point)", () => {
		const buffer = new Points([0, 0]).round(0.1).toArray()
		expect(buffer.length).toBe(1);
	});

	test("Test invalid geometry (two points)", () => {
		const buffer = new Points([0, 0, 1,1]).round(0.1).toArray()
		expect(buffer.length).toBe(2);
	});


	test("Test round", () => {
		const points = Points.fromCircle(4).round(0.1);
		const rpts = points.toArray().flatMap(r=>r.precision(5));
		const pts = [0.5,0,0.42929,0.07071,0.42929,-0.07071,0,-0.5,0.07071,-0.42929,-0.07071,-0.42929,-0.5,-0,-0.42929,-0.07071,-0.42929,0.07071,0,0.5, -0.07071,0.42929,  0.07071,  0.42929];
		expect(rpts).toStrictEqual(pts);
	});


	test("Test round with custom rounding", () => {
		const points = Points.fromCircle(4).round([0.1, 0.1, 0.1]);
		const rpts = points.toArray().flatMap(r=>r.precision(5));
		const pts = [0.5,0,0.42929,0.07071,0.42929,-0.07071,0,-0.5,0.07071,-0.42929,-0.07071,-0.42929,-0.5,-0,-0.5,-0,-0.5,-0,0,0.5, -0.07071,0.42929,0.07071,0.42929]
		expect(rpts).toStrictEqual(pts);
	});

	test("Test scale by scalar", () => {
		const points = Points.fromCircle(4).scaleByScalar(2);
		const pnts = [0,1,1,0,0,-1,-1,-0]
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}
	});

	test("Test measure", () => {
		const points = Points.fromCircle(3).precision(5)
		const rect = points.measure().flatMap(a=>a);
		const rect2 = points.rotate(Math.PI/2).precision(5).measure().flatMap(a=>a);
		expect(rect).toStrictEqual([-0.43301,-0.25,0.86602,0.75,0.43301,0.5]);
		expect(rect2).toStrictEqual([-0.68301,-0.68301,1.18301,1.18301,0.5,0.5]);
		
	});

	test("Test toString", () => {
		const d = Points.fromCircle(4).toString();
		expect(d).toBe("M 0, 0.5 L 0.5, 0 L 0, -0.5 L -0.5, 0z");
	});

	test("Test toString with noClose", () => {
		const d = Points.fromCircle(4).shouldClose(false).toString();
		expect(d).toBe("M 0, 0.5 L 0.5, 0 L 0, -0.5 L -0.5, 0");
	});

	test("Test the viewBox", () => {
		const points = Points.fromCircle(4)
		const viewBox = points.viewBox;
		const vb = points.viewBox;
		expect(viewBox).toBe('-0.5 -0.5 1 1');
		expect(vb).toBe('-0.5 -0.5 1 1');
	});

	test("Test aspectRatio", () => {
		const points = Points.fromCircle(4)
		const aspectRatio = points.aspectRatio;
		const ar = points.aspectRatio;
		expect(aspectRatio).toBe('1 / 1');
		expect(ar).toBe('1 / 1');
	});

	test("Test the viewInfo", () => {
		const points = Points.fromCircle(4)
		const viewInfo = points.viewInfo;
		const info = points.viewInfo;
		expect(viewInfo).toStrictEqual(['1 / 1', '-0.5 -0.5 1 1'])
		expect(info).toStrictEqual(['1 / 1', '-0.5 -0.5 1 1'])
	});
	
	test("Test the bounds", () => {
		const points = Points.fromCircle(4)
		const bounds = points.bounds;
		const b = points.bounds;
		expect(bounds).toStrictEqual([[-0.5, -0.5], [1,1], [0.5, 0.5]]);
		expect(b).toStrictEqual([[-0.5, -0.5], [1,1], [0.5, 0.5]]);
	});
});