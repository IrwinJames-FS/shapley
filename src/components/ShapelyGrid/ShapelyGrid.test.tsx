import { render, screen } from "@testing-library/react";
import ShapelyGrid from "./ShapelyGrid";

describe("Test Shapely Grid", () => {
	test("Test Shapely Grid minimal properties", async () => {
		render(<ShapelyGrid data-testid="test-grid" {...{
			columns: 5,
		}}>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			test
		</ShapelyGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.classList.contains('shapely-grid')).toBe(true);
		expect(grid.style.gridTemplateColumns).toBe("repeat(5, 1fr)");
		expect(grid.style.getPropertyValue('--column-size')).toBe('1');
		expect(grid.style.getPropertyValue('--row-size')).toBe('1');
	});
	test("Test Shapely Grid minimal properties", async () => {
		render(<ShapelyGrid data-testid="test-grid" {...{
			columns: 5,
			gap: 10,
			columnPrefix: '1fr',
			columnSuffix: '1fr',

		}}>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
		</ShapelyGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.style.getPropertyValue('--row-gap')).toBe('10px');
		expect(grid.style.getPropertyValue('--column-gap')).toBe('10px');
		expect(grid.style.gridTemplateColumns).toBe("1fr repeat(5, 1fr) 1fr");
	});
	test("Test Shapely Grid minimal properties", async () => {
		render(<ShapelyGrid data-testid="test-grid" {...{
			columns: 5,
			gap: [10, 5]
		}}>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
			<p>Test</p>
		</ShapelyGrid>);
		const grid = await screen.getByTestId("test-grid");
		expect(grid.style.getPropertyValue('--row-gap')).toBe('5px');
		expect(grid.style.getPropertyValue('--column-gap')).toBe('10px');
	});
});