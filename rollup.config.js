// rollup.config.js
import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import sass from 'rollup-plugin-sass'
import postcss from 'postcss';
import packageJson from "./package.json";
import autoprefixer from "autoprefixer";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
	    sass({
        insert: true,
        processor: css=>postcss([autoprefixer])
        .process(css)
        .then(result=>result.css)
      }),
      nodeResolve({extensions:['.css']})
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    external: [/\.scss$/],
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
];