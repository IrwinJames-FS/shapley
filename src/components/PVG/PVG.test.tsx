import { render } from "@testing-library/react";
import PVG from "./PVG";

describe("PVG - Polygon Vector Graphic", ()=>{
	test("renders PVG", ()=> {
		const {container } = render(<PVG {...{
			d: "M 0.5, 0, L 1,1 L 0,1z",
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

	test("renders PVG with custom shadow", ()=> {
		const {container } = render(<PVG {...{
			d: "M 0.5, 0, L 1,1 L 0,1z",
			pstyle: { shadow: "0 0 2px #000"}
		}}/>);
		const svg = container.querySelector('svg');
		expect(svg).toBeDefined();
		//TODO Build out more tests.
	});

	test("renders PVG with custom shadow and hoverable shadow", ()=> {
		const {container } = render(<PVG {...{
			d: "M 0.5, 0, L 1,1 L 0,1z",
			pstyle: { shadow: ["0 0 2px #000", "0 0 4px #000"]}
		}}/>);
		const svg = container.querySelector('svg');
		expect(svg).toBeDefined();
		//TODO Build out more tests.
	});

	test("renders PVG with custom shadow and hoverable shadow but with a falsy value", ()=> {
		const {container } = render(<PVG {...{
			d: "M 0.5, 0, L 1,1 L 0,1z",
			pstyle: { shadow: ["", "0 0 4px #000"]}
		}}/>);
		const svg = container.querySelector('svg');
		expect(svg).toBeDefined();
		//TODO Build out more tests.
	});

	test("renders PVG with with the cache flag", ()=> {
		const {container } = render(<PVG {...{
			d: "M 0.5, 0, L 1,1 L 0,1z",
			pstyle: { shadow: ["", "0 0 4px #000"]},
			xlinkHref:"#some-path"
		}} cached/>);
		const svg = container.querySelector('svg');
		expect(svg).toBeDefined();
		//TODO Build out more tests.
	});
	

})