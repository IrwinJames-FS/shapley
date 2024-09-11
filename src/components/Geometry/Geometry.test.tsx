import { render, screen } from "@testing-library/react";
import Geometry from "./Geometry";
import { Points } from "../../geometry";

describe("Test Geometry", ()=>{
	test("Test default Geometry Props", async ()=>{
		const points = Points.fromCircle(3);
		render(<Geometry data-testid="test-id" geometry={points}>Testing</Geometry>);
		const geometry = await screen.findByTestId("test-id");
		expect(geometry.classList.contains('shapely-geometric')).toBe(true);
		expect(geometry.children[0].tagName).toBe("svg");
		expect(geometry.children[0].classList.contains('shapely-geometric-bg'));
	});

	test("Test Geometry Props with custom aspectRatio and viewBox", async () => {
		const points = Points.fromCircle(3);
		render(<Geometry data-testid="test-id" geometry={points} aspectRatio="2 / 1" viewBox="0 0 1 1">Testing</Geometry>);
		const geometry = await screen.findByTestId("test-id");
		const svg = geometry.children[0]
		expect(svg.getAttribute('viewBox')).toBe('0 0 1 1');
		expect(geometry.style.getPropertyValue('--aspect-ratio')).toBe("2 / 1");
	})

	test("Test Geometry Props with multiple geometries with custom aspect ratio", async () => {
		const points = [Points.fromCircle(3), Points.fromCircle(3, Math.PI)];
		render(<Geometry data-testid="test-id" geometry={points} aspectRatio="2 / 1">Testing</Geometry>);
		const geometry = await screen.findByTestId("test-id");
		const svg = geometry.children[0]
		expect(svg.children.length).toBe(3);
		expect(svg.getAttribute('viewBox')).toBe(points[0].viewBox);
	})

	test("Test Geometry Props with multiple geometries with custom viewBox", async () => {
		const points = [Points.fromCircle(3), Points.fromCircle(3, Math.PI)];
		render(<Geometry data-testid="test-id" geometry={points} viewBox="0 0 1 1">Testing</Geometry>);
		const geometry = await screen.findByTestId("test-id");
		const svg = geometry.children[0]
		expect(svg.children.length).toBe(3);
		expect(svg.getAttribute('viewBox')).toBe("0 0 1 1");
	});

	test("Test Geometry Props Overridable tagName", async () => {
		const points = Points.fromCircle(3);
		render(<Geometry as="h1" data-testid="test-id" geometry={points}>Testing</Geometry>);
		const geometry = await screen.findByTestId('test-id');
		expect(geometry.tagName).toBe('H1');
	});
});