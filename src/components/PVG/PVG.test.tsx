import { render } from "@testing-library/react";
import PVG from "./PVG";

describe("PVG - Polygon Vector Graphic", ()=>{
	test("renders PVG", ()=> {
		const {container } = render(<PVG {...{
			d: "M 0.5, 0, L 1,1 L 0,1z",
			pstyle:{
				bgColor: ['#000', '#FFF'],
				borderColor: ['#FFF', '#000'],
				borderWidth: [0.1, 0.2],
				shadow: ['0 0 4px #000', '0 0 6px #000']
			}
		}}/>);
		const svg = container.querySelector('svg');
		expect(svg).toBeDefined();
		//TODO Build out more tests.
	})
})