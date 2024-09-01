import { render, screen } from "@testing-library/react";
import PathDefinition from "./PathDefinition";

const errlog = console.error.bind(console.error);
describe("Test Path Definition", () => {
	beforeAll(()=>console.error=()=>{});
	test("Test rendered path properties", () => {
		render(<PathDefinition data-testid="test-path" id="test-path" d="M 0, 0 L 1, 0 L 0.5, 1z"/>);
		const path = screen.getByTestId("test-path");
		const clipPath = path.nextElementSibling;

		expect(path.id).toBe("test-path");
		expect(path.getAttribute("d")).toBe("M 0, 0 L 1, 0 L 0.5, 1z");
		expect(clipPath).toBeDefined();
		expect(clipPath?.id).toBe("test-path-clip");
		expect(clipPath?.children[0]?.tagName.toLowerCase()).toBe("use");
		expect(clipPath?.children[0]?.getAttribute("href")).toBe("#test-path")
	});

	test("Test rendered path properties object bounding", () => {
		render(<PathDefinition data-testid="test-path" id="test-path" d="M 0, 0 L 1, 0 L 0.5, 1z" objectBounding/>);
		const path = screen.getByTestId("test-path").nextElementSibling!; //if it passed previous no reason to believe it wont work here
		expect(path.getAttribute("clipPathUnits")).toBe("objectBoundingBox");
	});

	test("Test rendered path properties with noclip enabled", () => {
		render(<PathDefinition data-testid="test-path" id="test-path" d="M 0, 0 L 1, 0 L 0.5, 1z" noclip/>);
		const path = screen.getByTestId("test-path").nextElementSibling; //if it passed previous no reason to believe it wont work here
		expect(path).toBeNull()
	});
	afterAll(()=>console.error = errlog);
});