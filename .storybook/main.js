import tsDoc from './tsDoc';
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../docs/*.mdx"],
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
    tsDoc();
    if(!config.plugins) config.plugins = [];
    //todo only do this in a dev environment
    config.plugins.push({
      name: 'ts-doc-watcher',
      enforce: 'post',
      handleHotUpdate({file}){
        if(!file.endsWith('.ts') || file.endsWith('.test.ts')) return; //do nothing
        const project = new Project();
        const fl = project.addSourceFileAtPath(file);
        tsSourceFile(fl);

      }
    });
    return config
  },
  staticDirs: ['../public']
};
export default config;
