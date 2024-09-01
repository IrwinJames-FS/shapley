import { render, screen } from "@testing-library/react";
import PolygonDefinition from "./PolygonDefinition";

const errlog = console.error.bind(console.error);
describe("Test Polygon Definition", () => {
	beforeAll(()=>console.error=()=>{});
	test("Test Polygon Definition rendered path props", () => {
		render(<PolygonDefinition data-testid="test-path" id="test-path"/>);
		const path = screen.getByTestId("test-path");
		expect(path.id).toBe("test-path");
		expect(path.getAttribute("d")).toBe("M 0.43301, -0.25 Q 0.43301, -0.25 0.43301, -0.25 L -0.43301, -0.25 Q -0.43301, -0.25 -0.43301, -0.25 L 0, 0.5 Q 0, 0.5 0, 0.5z");
	});
	afterAll(()=>console.error = errlog);
});