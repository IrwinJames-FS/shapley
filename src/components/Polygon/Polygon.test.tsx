import { render, screen } from "@testing-library/react"
import Polygon from "./Polygon"

describe("Test Polygon", () => {
	test("Test polygon rendered path", async () => {
		render(<Polygon data-testid="test-id"/>);
		const polygon = await screen.getByTestId("test-id");
		expect(polygon.querySelector('path')?.getAttribute('d')).toBe("M 43.30127, -25 Q 43.30127, -25 43.30127, -25 L -43.30127, -25 Q -43.30127, -25 -43.30127, -25 L 0, 50 Q 0, 50 0, 50z");
	});
});