import { __docs, __src } from "./constants";
import path from "path";

export const isWithinLibrary = (filePath: string) => filePath.startsWith(__src);

export const getTitleFromFilePath = (filePath: string) => filePath.replace(__src+'/', '').slice(0,-3);

export const getDashTitle = (title: string) => title.replace(/\//g, '-');

export const getDocPathFromTitle = (title: string) => path.join(__docs, getDashTitle(title)+'.mdx');

export const getDocPathFromFilePath = (filePath: string) => getDocPathFromTitle(getTitleFromFilePath(filePath));

export const getDocLinkPathFromFilePath = (filePath: string) => `/?path=/docs/${getDashTitle(getTitleFromFilePath(filePath))}--docs`;
