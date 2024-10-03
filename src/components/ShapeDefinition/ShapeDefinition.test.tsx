import { render, screen } from "@testing-library/react";
import { ShapeDefinition } from "./ShapeDefinition";
import { Geometry } from "../../geometry";

const err = console.error;
describe("Test Shape Definition", () => {
	beforeAll(()=>{
		//SVG component can trigger undesired warnings due to testing library not supporting them.
		//a cleaner fix is to wrap the component in an svg
		//console.error = ()=>{};
	});
	test("Test the Shape Definition", () => {
		const rendering = render(<svg>
			<defs data-testid="Testid">
			<ShapeDefinition
		id="test"
		geometry={Geometry.fromCircle(4).round(1)}/>
			</defs>
		</svg>);
		const el = rendering.getByTestId("Testid");
		expect(el.querySelector("path")).toBeDefined();
		expect(el.querySelector("clipPath")).toBeDefined();
	});
	afterAll(()=>{
		//console.error = err;
	});
});