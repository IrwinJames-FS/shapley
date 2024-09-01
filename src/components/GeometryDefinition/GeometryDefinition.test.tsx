import { render, screen } from "@testing-library/react"
import GeometryDefinition from "./GeometryDefinition"
import { Points } from "../../geometry"

const errlog = console.error.bind(console.error);
describe("Test Geometry Definition", () => {
	beforeAll(()=>console.error=()=>{});
	test("Test Geometry Definition rendered path props", () => {
		render(<GeometryDefinition data-testid="test-path" id="test-path" geometry={new Points([0,0,1,0,0.5,1])}/>)
		const path = screen.getByTestId("test-path");
		expect(path.id).toBe("test-path");
		expect(path.getAttribute("d")).toBe("M 0, 0 L 1, 0 L 0.5, 1z");
	});
	test("Test Geometry Definition rendered path props objectBounding", () => {
		render(<GeometryDefinition data-testid="test-path" id="test-path" geometry={new Points([0,0,2,0,1,2])} objectBounding/>);
		const path = screen.getByTestId("test-path");
		expect(path.id).toBe("test-path");
		expect(path.getAttribute("d")).toBe("M 0, 0 L 1, 0 L 0.5, 1z");
	});
	afterAll(()=>console.error=errlog);
});