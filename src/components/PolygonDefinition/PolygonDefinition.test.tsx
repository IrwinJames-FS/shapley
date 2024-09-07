import { render, screen } from "@testing-library/react";
import PolygonDefinition from "./PolygonDefinition";

const errlog = console.error.bind(console.error);
describe("Test Polygon Definition", () => {
	beforeAll(()=>console.error=()=>{});
	test("Test Polygon Definition rendered path props", () => {
		render(<PolygonDefinition data-testid="test-path" id="test-path"/>);
		const path = screen.getByTestId("test-path");
		expect(path.id).toBe("test-path");
		expect(path.getAttribute("d")).toBe("M 43.30127, -25 Q 43.30127, -25 43.30127, -25 L -43.30127, -25 Q -43.30127, -25 -43.30127, -25 L 0, 50 Q 0, 50 0, 50z");
	});
	afterAll(()=>console.error = errlog);
});