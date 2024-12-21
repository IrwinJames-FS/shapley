import path from "path";
/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-tsdoc"
  ],
  viteFinal: (config) => {
    config.resolve.alias["~"] = path.join(__dirname, "../")
    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  }
};
export default config;
