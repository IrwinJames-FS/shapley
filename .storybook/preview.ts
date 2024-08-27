import type { Preview } from "@storybook/react";
import './story.style.css';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const onStorybookInit = () => {
  console.log("Initializing");
};
