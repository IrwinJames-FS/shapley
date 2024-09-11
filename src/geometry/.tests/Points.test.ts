import { round } from "../arithmetic";
import Point from "../Point";
import Points from "../Points";

const warnlog = console.warn.bind(console.warn);
describe("Test Points class to ensure its working properly", ()=>{
	beforeAll(()=>console.warn=()=>{});
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
		expect(''+points).toBe("M 0, -50 L -43.30127, 25 L 43.30127, 25z");
	});

	test("Test translate", () => {
		const points = Points.fromCircle(4).translate(Point.px(2,2));
		const pnts = [2,52,52,2,2,-48,-48,2];
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}
	});

	test("Test rotate", () => {
		const points = Points.fromCircle(4).rotate(Math.PI/2);
		const pnts = [50,50,50,-50,-50,-50, -50,50];
		for(const [x,y] of points.generator()){
			const a = pnts.shift();
			const b = pnts.shift();
			expect(round(x,5)).toBe(a);
			expect(round(y,5)).toBe(b);
		}
	});

	test("Test scale", () => {
		const points = Points.fromCircle(4).scale(Point.px(2,2));
		const pnts = [0,100,100,0,0,-100,-100,-0]
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
		const pts = [50,0, 49.92929, 0.07071, 49.92929,-0.07071,0,-50,0.07071,-49.92929,-0.07071,-49.92929,-50,-0,-49.92929,-0.07071,-49.92929,0.07071,0,50, -0.07071,49.92929,  0.07071,  49.92929];
		expect(rpts).toStrictEqual(pts);
	});


	test("Test round with custom rounding", () => {
		const points = Points.fromCircle(4).round([0.1, 0.1, 0.1]);
		const rpts = points.toArray().flatMap(r=>r.precision(5));
		const pts = [50,0,49.92929,0.07071,49.92929,-0.07071,0,-50,0.07071,-49.92929,-0.07071,-49.92929,-50,-0,-50,-0,-50,-0,0,50, -0.07071,49.92929,0.07071,49.92929]
		expect(rpts).toStrictEqual(pts);
	});

	test("Test scale by scalar", () => {
		const points = Points.fromCircle(4).scaleByScalar(2);
		const pnts = [0,100,100,0,0,-100,-100,-0]
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
		expect(rect).toStrictEqual([-43.30127,-25,86.60254,75,43.30127,50]);
		expect(rect2).toStrictEqual([-68.30127,-68.30127,118.30127,118.30127,50,50]);
		
	});

	test("Test toString", () => {
		const d = Points.fromCircle(4).toString();
		expect(d).toBe("M 0, 50 L 50, 0 L 0, -50 L -50, 0z");
	});

	test("Test toString with noClose", () => {
		const d = Points.fromCircle(4).shouldClose(false).toString();
		expect(d).toBe("M 0, 50 L 50, 0 L 0, -50 L -50, 0");
	});

	test("Test the viewBox", () => {
		const points = Points.fromCircle(4)
		const viewBox = points.viewBox;
		const vb = points.viewBox;
		expect(viewBox).toBe('-50 -50 100 100');
		expect(vb).toBe(viewBox); //verify that vb is equal to viewBox
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
		expect(viewInfo).toStrictEqual(['1 / 1', '-50 -50 100 100'])
		expect(info).toStrictEqual(viewInfo)
	});
	
	test("Test the bounds", () => {
		const points = Points.fromCircle(4)
		const bounds = points.bounds;
		const b = points.bounds;
		expect(bounds).toStrictEqual([[-50, -50], [100,100], [50, 50]]);
		expect(b).toStrictEqual(bounds);
	});
	afterAll(()=>console.warn=warnlog);
});