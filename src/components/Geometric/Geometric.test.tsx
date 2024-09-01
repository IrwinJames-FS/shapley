import { render, screen } from "@testing-library/react";
import { Points } from "../../geometry";
import Geometric from "./Geometric";

describe("Test Geometric", () => {
	test("Test Geometric rendering properties", () => {
		const points = Points.fromCircle(6)
		const vb = points.viewBox; //previous tests say this is accurate
		render(<Geometric data-testid="test-geometric" className="test-class another-test" geometry={points}/>);
		const geometric = screen.getByTestId("test-geometric");
		expect(geometric.classList.contains("shapely-geometry")).toBe(true);
		expect(geometric.classList.contains("test-class")).toBe(true);
		expect(geometric.querySelector('defs')).toBeDefined();
		expect(geometric.getAttribute("viewBox")).toBe(vb);
		expect(geometric.children.length).toBe(2);
	});

	test("Test Geometric rendering multiple geometries", ()=>{
		const points = [Points.fromCircle(3), Points.fromCircle(3, Math.PI)];
		render(<Geometric data-testid="test-geometric" geometry={points}/>);
		const geometric = screen.getByTestId("test-geometric");
		expect(geometric.children.length).toBe(3);
	});

	test("Test Geometric rendering properties when using reference pathID", ()=>{
		render(<Geometric data-testid="test-geometric" src="test-path"/>);
		const geometric = screen.getByTestId("test-geometric");
		expect(geometric.children.length).toBe(1);
	});

	test("Test Geometric rendering properties when using reference pathID and objectBounding", ()=>{
		render(<Geometric data-testid="test-geometric" src="test-path" objectBounding/>);
		const geometric = screen.getByTestId("test-geometric");
		expect(geometric.children.length).toBe(1);
		expect(geometric.getAttribute('viewBox')).toBe('0 0 1 1');
	});

	test("Test Geometric rendering properties when using reference pathID and custom view box", ()=>{
		render(<Geometric data-testid="test-geometric" src="test-path" viewBox="0 0 2 2"/>);
		const geometric = screen.getByTestId("test-geometric");
		expect(geometric.children.length).toBe(1);
		expect(geometric.getAttribute('viewBox')).toBe('0 0 2 2');
	});

	test("Test Geometric rendering with no instructions", ()=>{
		render(<Geometric data-testid="test-geometric"/>);
		
		expect(()=>screen.getByTestId("test-geometric")).toThrow()
	});
});