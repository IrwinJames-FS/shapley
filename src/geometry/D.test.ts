
import D, { fromArray } from "./D";
describe(`Test the D class`, ()=>{
	test(`Test initializer`, ()=>{
		const d = new D("M 50,0 L 100,100, 0,100z");
		const d1 = new D([50,0,100,100,0,100]);

		console.log(''+d);
		console.log(''+d1);
	});
});