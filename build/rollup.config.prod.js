import filesize from "rollup-plugin-filesize";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

import baseConfig from "./rollup.config.base";
import { name, version, author } from "../package.json";

// 支持输出 []
export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      {
        file: `dist/${name}.js`,
        format: "umd",
        name,
        sourcemap: true,
      },
      // cjs and esm version
      {
        file: `dist/${name}.cjs.js`,
        format: "cjs",
      },
      // cjs and esm version
      {
        file: `dist/${name}.esm.js`,
        format: "es",
      },
    ],
    plugins: [...baseConfig.plugins, filesize()],
  },
  // .min.js
  {
    ...baseConfig,
    output: [
      // umd with compress version
      {
        file: `dist/${name}.min.js`,
        format: "umd",
        name,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
      uglify(
        {
          // compress: {
          //   drop_console: true
          // }
        },
        minify
      ),
      filesize(),
    ],
  },
];
