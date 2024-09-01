import { render, screen } from "@testing-library/react";
import GeometryRef from "./GeometryRef";

const errlog = console.error.bind(console.error);
describe("Test Geometry Reference Component", () => {
	beforeAll(()=>console.error=()=>{});
	test("Test rendered Geometery References properties", () => {
		render(<GeometryRef data-testid="test-path" src="#test-path"/>);
		const use = screen.getByTestId("test-path");
		expect(use.getAttribute("href")).toBe("#test-path");
	});

	test("Test rendered Geometery References properties", () => {
		render(<GeometryRef data-testid="test-path"/>);
		expect(screen.getByTestId("test-path").getAttribute("href")).toBe(null);
	});
	afterAll(()=>console.error=errlog);
});