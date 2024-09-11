import { render, screen } from "@testing-library/react";
import Polygonic from "./Polygonic";

describe("Test Polygonic", () => {
	test("Test Polygonic rendering properties", () => {
		render(<Polygonic data-testid="test-polygonic"/>);
		const polygonic = screen.getByTestId("test-polygonic");
		expect(polygonic.classList.contains("shapely-geometry")).toBe(true);
	});
});