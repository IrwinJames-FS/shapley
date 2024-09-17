import { render } from "@testing-library/react";
import { GeometryDefinition } from "./GeometryDefinition";
import { Geometry } from "../../geometry";
const errlog = console.error.bind(console.error);
describe("Test the GeometryDefinition Component", ()=>{
	beforeAll(()=>console.error=()=>{});
	test("Test the Basic usage of a GeometryDefinition", async () => {
		const {findByTestId} = render(<GeometryDefinition {...{
			id: 'geo-test',
			geometry: Geometry.fromBuffer([-1,-1,1,-1,1,1,-1,1]),
			components: {
				path: {dataTestid: 'geo-test-path'},
				clipPath: {dataTestid: 'geo-test-clip-path'}
			}
		}}/>);
		const path = findByTestId('geo-test-path');
		const clipPath = findByTestId('geo-test-clip-path');

		//by existing we can confirm the component spread is working.
		expect(path).toBeDefined();
		expect(clipPath).toBeDefined();
	});
	afterAll(()=>console.error = errlog);
})