import { render, screen } from "@testing-library/react";
import SVGCanvas from "./SVGCanvas";
import PolygonDefinition from "../PolygonDefinition";
import GeometryRef from "../GeometryRef";

describe("Test SVGCanvas", ()=>{
	test("Test SVGCanvas rendered properties", () => {
		render(<SVGCanvas data-testid="test-canvas"></SVGCanvas>)
		const canvas = screen.getByTestId("test-canvas");
		expect(canvas.children.length).toBe(0);
		expect(canvas.classList.contains("shapely-svg-canvas")).toBe(true);
	});

	test("Test SVGCanvas rendered properties with definition and use", () => {
		render(<SVGCanvas data-testid="test-canvas" defs={<PolygonDefinition id="test-triangle"/>}>
			<GeometryRef src="#test-triangle"/>
		</SVGCanvas>)
		const canvas = screen.getByTestId("test-canvas");
		expect(canvas.children.length).toBe(2);
		expect(canvas.classList.contains("shapely-svg-canvas")).toBe(true);
		expect(canvas.children[0].children.length).toBe(2); //should have a pth and clip path
	});
});