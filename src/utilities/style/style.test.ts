import { clsfy, shadowfy, standardizeValue, vars } from "./style"

describe("Test the styling methods", ()=>{
	test("Test vars() appropriately converts object names", () => {
		const cssVars = vars({
			shadow: undefined,
			bgColor: '#F00',
			borderColor: ["#0F0", "#FF0", "#FFF"]
		}, ['', 'hover-']);
		const cssVars2 = vars({
			bgColor: ["#000", "#FFF"]
		})
		expect(cssVars)
		.toStrictEqual({
			'--bg-color': '#F00',
			'--border-color': '#0F0',
			'--hover-border-color': '#FF0'
		});
		expect(cssVars2)
		.toStrictEqual({
			'--bg-color': "#000"
		})
	});

	test("Test standardizeValue appropriately standardizes different forms of values", ()=>{
		const a = standardizeValue(1);
		const b = standardizeValue(1, 'rem');
		const c = standardizeValue('1px', 'rem');
		const d = standardizeValue(undefined)
		expect(a).toBe("1px");
		expect(b).toBe("1rem");
		expect(c).toBe('1px');
		expect(d).toBe("none");
	});

	test("Test clsfy to ensure it generates a space delimited strings in a vareity of circumstances", ()=>{
		const a = clsfy("test-class");
		const b = clsfy(a, "addt-class")
		expect(a).toBe("test-class");
		expect(b).toBe("test-class addt-class");
	});

	test("Test shadowfy to ensure it generate the appropate code for multiple shadows", () => {
		const a = shadowfy('0 0 4px #000');
		const c = shadowfy();
		expect(a).toStrictEqual({'--shadow': 'drop-shadow(0 0 4px #000)'});
		expect(c).toStrictEqual({});
	});
})