import React from 'react';
import type { Preview } from "@storybook/react";
import { Title, Subtitle, Description, Stories } from '@storybook/blocks';
import './story.style.css';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: ()=>(<>
        <Title />
        <Subtitle />
        <Description />
        <Stories />
      </>)
    }
  },
};


export default preview;
