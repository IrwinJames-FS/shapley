import { render, screen } from "@testing-library/react";
import DiamondGrid from "./DiamondGrid";

describe("Test Diamond Grid", ()=>{
	test("Test Diamond Grid default props", async () => {
		render(<DiamondGrid data-testid="test-grid" {...{
			columns: 5
		}}>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</DiamondGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.previousElementSibling).toBeDefined();
	});

	test("Test Diamond Grid with Custom Geometries", async () => {
		render(<DiamondGrid data-testid="test-grid" {...{
			columns: 5,
			geometry: "diamond"
		}}>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
			<h1>Test</h1>
		</DiamondGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.previousElementSibling).toBeNull();
	});
});