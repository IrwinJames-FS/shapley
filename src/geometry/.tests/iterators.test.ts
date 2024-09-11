import { fromCircle } from "../iterators"

describe("Testing iterator cases not testable via Points", ()=>{
	test("Test fromCircle Argument Assumptions", ()=>{
		const gen = fromCircle(3);
		expect(typeof gen).toBe('function');
	})
});