import { TsDocGen } from './tsDoc';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../docs/*.mdx","../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async config => {
    const docgen = new TsDocGen();
    await docgen.load();
    if(!config.plugins) config.plugins = [];
    config.plugins.push({
      name: 'ts-doc-watcher',
      enforce: 'post',
      async handleHotUpdate({file}){
        if(!file.endsWith('.ts') || file.endsWith('.test.ts')) return; //only evaluate typescript files.
        await docgen.updateSourceFile(file);
      }
    });
    return config;
  }
};
export default config;
