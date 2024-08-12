import { Meta, StoryObj } from "@storybook/react";
import ShapeVG from "./ShapeVG";
import { ShapeVGProps } from "./types";
import { polygon } from "../../geometry";




export default {
	component: ShapeVG,
	render: args => <ShapeVG {...args}/>
} as Meta<ShapeVGProps>

type Story = StoryObj<ShapeVGProps>;

export const TriangleVG: Story = {
	args: {
		generator: polygon(3, 0)(),
		cornerRadius: 0.1,
		pstyle: {
			bgColor: "rgb(28,128,248)",
			borderColor: "#000",
			borderWidth: 0.05,
			shadow: "0 0 4px #000"
		},
		components: {
			svg: {
				viewBox: '-1 -1 2 2'
			}
		}
	}
};

export const DiamondVG: Story = {
	args: {
		generator: polygon(4, 0)(),
		cornerRadius: 0.1,
		pstyle: {
			bgColor: "rgb(28,128,248)",
			borderColor: "#000",
			borderWidth: 0.05,
			shadow: "0 0 4px #000"
		},
		components: {
			svg: {
				viewBox: '-1 -1 2 2'
			}
		}
	}
}

export const PentagonVG: Story = {
	args: {
		generator: polygon(5, Math.PI)(),
		cornerRadius: 0.1,
		pstyle: {
			bgColor: "rgb(28,128,248)",
			borderColor: "#000",
			borderWidth: 0.05,
			shadow: "0 0 4px #000"
		},
		components: {
			svg: {
				viewBox: '-1 -1 2 2'
			}
		}
	}
};

export const HexagonVG: Story = {
	args: {
		generator: polygon(6, 0)(),
		cornerRadius: 0.1,
		pstyle: {
			bgColor: "rgb(28,128,248)",
			borderColor: "#000",
			borderWidth: 0.05,
			shadow: "0 0 4px #000"
		},
		components: {
			svg: {
				viewBox: '-1 -1 2 2'
			}
		}
	}
};

export const HeptagonVG: Story = {
	args: {
		generator: polygon(7, 0)(),
		cornerRadius: 0.1,
		pstyle: {
			bgColor: "rgb(28,128,248)",
			borderColor: "#000",
			borderWidth: 0.05,
			shadow: "0 0 4px #000"
		},
		components: {
			svg: {
				viewBox: '-1 -1 2 2'
			}
		}
	}
}

export const OctagonVG: Story = {
	args: {
		generator: polygon(8, 0)(),
		cornerRadius: 0.1,
		pstyle: {
			bgColor: "rgb(28,128,248)",
			borderColor: "#000",
			borderWidth: 0.05,
			shadow: "0 0 4px #000"
		},
		components: {
			svg: {
				viewBox: '-1 -1 2 2'
			}
		}
	}
}
