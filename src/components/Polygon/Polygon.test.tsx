import { render, screen } from "@testing-library/react"
import Polygon from "./Polygon"

describe("Test Polygon", () => {
	test("Test polygon rendered path", async () => {
		render(<Polygon data-testid="test-id"/>);
		const polygon = await screen.getByTestId("test-id");
		expect(polygon.querySelector('path')?.getAttribute('d')).toBe("M 0.43301, -0.25 Q 0.43301, -0.25 0.43301, -0.25 L -0.43301, -0.25 Q -0.43301, -0.25 -0.43301, -0.25 L 0, 0.5 Q 0, 0.5 0, 0.5z");
	});
});