import Point from "../Point";
import RoundedCorner from "../RoundedCorner";

describe("Test the rounded corner class to ensure it works properly", ()=>{
	test("Test rounded corner initializer", ()=>{
		const corner = new RoundedCorner(Point.zero, Point.px(1,1), Point.px(2,2));
		expect(corner).toStrictEqual([1, 1, 0,0, 2, 2]);
	});
});