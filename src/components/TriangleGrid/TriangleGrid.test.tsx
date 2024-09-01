import { render, screen } from "@testing-library/react";
import TriangleGrid from "./TriangleGrid";

describe("Test Triangle Grid", () => {
	test("Test Triangle Grid Default Properties", async () => {
		render(<TriangleGrid data-testid="test-grid" {...{
			columns: 5
		}}>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</TriangleGrid>)
		const grid = await screen.getByTestId("test-grid");
		expect(grid.style.gridTemplateColumns).toBe("repeat(5, 1fr) 1fr");
	});

	test("Test Triangle Grid with Custom Geometries", async () => {
		render(<TriangleGrid data-testid="test-grid" {...{
			columns: 5,
			geometries: ["triangle-even", "triangle-odd"]
		}}>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</TriangleGrid>)
		const grid = await screen.getByTestId("test-grid");
		expect(grid.style.gridTemplateColumns).toBe("repeat(5, 1fr) 1fr");
	});

	test("Test Triangle Grid Default Properties", async () => {
		render(<TriangleGrid data-testid="test-grid" {...{
			columns: 5
		}} horizontal>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</TriangleGrid>)
		const grid = await screen.getByTestId("test-grid");
		expect(grid.style.gridTemplateColumns).toBe("repeat(5, 1fr) 1fr");
	});
});