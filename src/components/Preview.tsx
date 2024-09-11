/*
THIS COMPONENT IS NOT PART OF THE LIBRARY THIS IS USED TO SIMPLIFY THE LAYOUT PROCESS.
*/

import { ReactRenderer } from "@storybook/react"
import { PartialStoryFn } from "storybook/internal/types"

import './story.style.scss';
const Preview = (Story:PartialStoryFn<ReactRenderer, unknown>)=>(<div className="shapely-story-preview"><div><Story/></div></div>);

export default Preview;