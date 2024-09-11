import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
	theme,
	sidebar: {
		filters: {
			patterns: item => {
			console.log("Checking tag", item.title)
			return !item.tags?.includes('anon')
			}
		}
	}
});