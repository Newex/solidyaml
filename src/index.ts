import type { Plugin } from "rollup";
import { loader } from "./importer.js";

export interface Options {
}

export default function solidYaml(options?: Options): Plugin {
  return {
    name: 'vite-plugin-solidYaml',
    version: "0.0.1",

    resolveId: async function (source, importer, options) {
      if (source.endsWith(".yml") || source.endsWith(".yaml")) {
        return source;
      }
    },

    load: loader(options)
    // transform: transformer
   }
}