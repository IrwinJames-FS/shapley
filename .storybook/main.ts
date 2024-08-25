import type { StorybookConfig } from "@storybook/react-vite";
import docerizer from "./docerizer";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../docs/**/*.mdx"],
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
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {}
  },
  viteFinal: async (config) => {
    await docerizer();
    return config;
  },
  staticDirs: ['../public']
};
export default config;
