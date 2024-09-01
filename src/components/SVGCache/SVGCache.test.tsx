import { render, screen } from "@testing-library/react";
import SVGCache from "./SVGCache";

describe("test SVGCache", ()=>{
	test("Rendered Cache Props", () => {
		render(<SVGCache data-testid="test-cache"></SVGCache>);
		const cache = screen.getByTestId("test-cache");
		expect(cache.children.length).toBe(1);
		expect(cache.children[0].tagName).toBe("defs");
	});
});