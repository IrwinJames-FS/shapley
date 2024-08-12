import { normalizedPolygon } from "./iterators"
import { pathify } from "./pathify"

describe("Check that pathify is rendering the correct paths", ()=>{
	test("Check a path without a corner radius", ()=>{
		const path = pathify(normalizedPolygon(3, 0), 0);
		expect(path).toBe("M 1.00000, 0.00000 L 0.00000, 0.00000 L 0.50000, 1.00000z")
	});

	test("Check a path with a corner radius", ()=>{
		const path = pathify(normalizedPolygon(3, 0), 0.1);
		expect(path).toBe("M 0.95528, 0.08944 Q 1.00000, 0.00000 0.90000, 0.00000 L 0.10000, 0.00000 Q 0.00000, 0.00000 0.04472, 0.08944 L 0.45528, 0.91056 Q 0.50000, 1.00000 0.54472, 0.91056z")
	});
})