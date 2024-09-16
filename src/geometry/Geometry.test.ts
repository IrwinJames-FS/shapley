import { Geometry } from "./Geometry";
import { Point } from "./Point";

describe("Test the Geometry Class", ()=>{
	test("Test the Geometry Initialization", ()=>{
		const points = [[0,-1],[-1,1],[1,1]];
		const triangle = new Geometry(function*(){
			for(const [x,y] of points){
				yield new Point(x,y);
			}
		});
		let i = 0;
		for(const p of triangle.geometry()){
			expect(p.equals(points[i])).toBe(true);
			i++;
		}
	});

	test("Test the Geometry fromBuffer static method", ()=>{
		const points = [[0,-1],[-1,1],[1,1]];
		const triangle = Geometry.fromBuffer(points.flatMap(v=>v));
		let i = 0;
		for(const p of triangle.geometry()){
			expect(p.equals(points[i])).toBe(true);
			i++;
		}
	});

	test("Test the Geometry fromBuffer static method with an invalid points buffer", ()=>{
		const points = [0,-1,-1,1,1];
		try{
			expect(Geometry.fromBuffer(points)).toThrow()
		} catch  {}
		
	});

	test("Test the Geometry fromCircle static method", ()=>{
		const triangle = Geometry.fromCircle(3).floor().toArray().flatMap(p=>p.toArray());
		expect(triangle).toStrictEqual([0,50,43,-25,-44,-26])
	});

	test("Test the EmptyGenerator Method", ()=>{
		for(const x of Geometry.EmptyGenerator()()){throw new Error("There should not be an iteration completed", x)}
	});

	test("Test the floor method method", () => {
		const a = Geometry.fromCircle(4).floor().toBuffer();
		expect(a).toStrictEqual([0,50,50,0,0,-50,-50,-1]);
	});

	test("Test the Geometry ceil method", () => {
		const a = Geometry.fromCircle(4).ceil().toBuffer();
		expect(a).toStrictEqual([0,50,50,1,1,-50,-50,-0]);
	});

	test("Test the Geometry round method", () => {
		const a = Geometry.fromCircle(4).round().toBuffer();
		expect(a).toStrictEqual([0,50,50,0,0,-50,-50,-0]);
	});


	test("Test the Geometry translate method", ()=>{
		const diamond = Geometry.fromCircle(4).translate(50).round().toArray().flatMap(p=>p.toArray());
		expect(diamond).toStrictEqual([50,100,100,50,50,0,0,50]);
	});

	test("Test Geometry scale method", () => {
		const diamond = Geometry.fromCircle(4).scale(0.1).round().toBuffer();
		expect(diamond).toStrictEqual([0,5,5,0,0,-5,-5,-0])
	});

	test("Test the Geometry rotate method", ()=>{
		const diamond = Geometry.fromCircle(4);
		const a = diamond.clone().rotate(Math.PI/4).round();
		expect(a.toBuffer()).toStrictEqual([35,35,35,-35,-35,-35,-35,35]);
	})
});