import { render } from "@testing-library/react";
import ShapeVG from "./ShapeVG";
import { normalizedPolygon } from "../../geometry";
describe("Test the shape VG component to ensure it working properly", () => {
	test("renders PVG", ()=> {
		const {container } = render(<ShapeVG {...{
			generator: normalizedPolygon(3, 0),
		}}/>);
		const svg = container.querySelector('svg');

		expect(svg).toBeDefined();
		expect(svg?.getAttribute('viewBox')).toBe('0 0 1 1');
		expect(svg?.getAttribute("preserveAspectRatio")).toBe("none");
		expect(svg?.getAttribute("class")).toBe("shapely-pvg");
		expect(svg?.style.getPropertyValue('--bg-color')).toBe("transparent");
		expect(svg?.style.getPropertyValue("--border-color")).toBe("#000");
		expect(svg?.style.getPropertyValue("--border-width")).toBe("0");
		expect(svg?.style.getPropertyValue("--shadow")).toBe("none");
		
	});

})