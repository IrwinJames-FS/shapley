import { $d } from "../ngon"
import Point from "../Point"
import RoundedCorner from "../RoundedCorner"

describe("Test ngon methods", ()=>{
	test("Test Command Template Compiler", () => {
		const d = $d`M ${0}, ${0} L ${[1,1]} L ${Point.px(0, 1)} L ${new RoundedCorner([-0.5, 1], [-0.75, 0.5], [-0.5, 0])}z`;
		expect(d).toBe('M 0, 0 L 1, 1 L 0, 1 L -0.5, 1 Q -0.75, 0.5 -0.5, 0z');
	});
});