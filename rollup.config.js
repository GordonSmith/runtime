import node from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";

const defaultOutput = {
  banner: `// @observablehq/notebook-runtime Copyright ${(new Date).getFullYear()} Observable, Inc.`,
};

function config(output) {
  return {
    input: "src/index.js",
    plugins: [
      node({module: false, main: true}),
      commonjs({
        namedExports: {
          "d3-require/dist/d3-require.js": ["require", "requireFrom"]
        }
      }),
      uglify()
    ],
    output: Object.assign(output, defaultOutput)
  };
}

export default [
  config({
    format: "es",
    file: "dist/notebook-runtime.js"
  }),
  config({
    format: "umd",
    extend: true,
    name: "observablehq",
    file: "dist/notebook-runtime.umd.js"
  })
];
