import { Meta, StoryObj } from "@storybook/react/*";
import { Hexagon, Triangle } from "./components";
import './gettingstarted.scss';

/**
 * This is a test
 */
export default {
	title: "Getting Started",
} as Meta;

export const FirstExample: StoryObj = {
	tags:['anon'],
	render: ()=><Triangle {...{
		style:{
			backgroundColor:'rgb(28,128,248)',
			borderColor:'#000',
			borderWidth: 2,
			boxShadow: '0 0 4px #000',
			width: '8rem'
		},
		cornerRadius: 10
	}}>Google</Triangle>
}

export const SecondExample: StoryObj = {
	tags:['anon'],
	render: ()=>(<Hexagon {...{
		as: "a",
		href: "https://www.google.com",
		style: {
			display: 'inline-flex',
			backgroundColor: "rgb(28,128,248)",
			borderColor: "#FFF",
			borderWidth: 2,
			boxShadow: "0 0 4px #000",
			padding: "2rem",
			color: "#FFF"
		},
		cornerRadius: 10,
		rotation: 30
	}}>Google</Hexagon>)
}

export const ThirdExample: StoryObj = {
	tags:['anon'],
	render: ()=>(<Hexagon {...{
		as: "a",
		href: "https://www.google.com",
		className: 'my-awesome-hexagon',
		cornerRadius: 10,
		rotation: 30
	}}>Google</Hexagon>)
}