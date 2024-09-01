import { render, screen } from "@testing-library/react";
import HexagonGrid from "./HexagonGrid";

describe("Test Hexagon Grid", () => {
	test("Test Hexagon Grid default properties", async () => {
		render(<HexagonGrid data-testid="test-grid" {...{
			columns: 5
		}}>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</HexagonGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.previousElementSibling).toBeDefined()
		expect(grid.style.gridTemplateColumns).toBe("repeat(5, 1fr) 1fr")
	});
	test("Test Hexagon Grid horizontal", async () => {
		render(<HexagonGrid data-testid="test-grid" {...{
			columns: 5
		}} horizontal>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</HexagonGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.previousElementSibling).toBeDefined()
		expect(grid.style.gridTemplateColumns).toBe("repeat(5, 1fr 2fr) 1fr")
	});

	test("Test Hexagon Grid custom geometries", async () => {
		render(<HexagonGrid data-testid="test-grid" {...{
			columns: 5,
			geometry: "hexagon"
		}} horizontal>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</HexagonGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.previousElementSibling).toBeNull();
	});
});