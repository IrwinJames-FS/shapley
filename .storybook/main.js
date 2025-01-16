import path from "path";
/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@irwinproject/storybook-addon-tsdoc"
  ],
  
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ['../public'],
};
export default config;
