import { Meta, StoryObj } from "@storybook/react/*";
import {round, toDeg, toRad} from './arithmetic';

import './stories.scss';
import { ResultTable } from "./ResultTable";
import { FNSignature } from "./FNSignature";

/**
 * Arithmetic functions are simply methods that would be beneficial when working with numbers.
 */
export default {
	title: 'Geometry/Arithmetic',
	component: ResultTable,
	tags: ['autodocs'],
} as Meta;

/**
 * Rounds a value to the provided decimal place
 */
export const roundMethod: StoryObj<{
	/**
	 * The value you want to round
	 */
	value: number,

	/**
	 * The number of decimal places you want to round to
	 */
	limit: number
}> = {
	args: {
		value: Math.PI,
		limit: 3
	},
	render: ({value, limit})=>{
		const rVal = round(value, limit);
		return (<>
		<FNSignature {...{
			name:'round',
			args: [
				{
					name: 'value',
					type: 'number',
					value
				},
				{
					name: 'limit',
					type: 'number',
					value: limit
				}
			],
			returnValue: {
				type: 'string',
				value: rVal
			}
		}}/>
		<ResultTable {...{
			headers: ['Raw', 'Rounded'],
			rows: [[value, rVal]]
		}}/>
	</>)
	}
}

/**
 * Converts radians to degrees
 */
export const toDegMethod: StoryObj<{
	radian: number
}> = {
	args: {
		radian: Math.PI
	},
	render: ({radian}) =>{
		const deg = toDeg(radian);
		return (<>
		<FNSignature {...{
			name: 'toDeg',
			args: [{
				name: 'radian',
				type: 'number',
				value: radian
			}],
			returnValue: {
				type: 'number',
				value: deg
			}
		}}/>
		<ResultTable {...{
			headers: ['Radian', 'Degree'],
			rows: [[radian, deg]]
		}}/>
		</>);
	}
}

/**
 * Converts degrees to radians
 */
export const toRadMethod: StoryObj<{
	deg: number
}> = {
	args: {
		deg: 180
	},
	render: ({deg}) =>{
		const radian = toRad(deg);
		return (<>
		<FNSignature {...{
			name: 'toRad',
			args: [{
				name: 'degree',
				type: 'number',
				value: deg
			}],
			returnValue: {
				type: 'number',
				value: radian
			}
		}}/>
		<ResultTable {...{
			headers: ['Degree', 'Radian'],
			rows: [[deg, radian]]
		}}/>
		</>);
	}
}