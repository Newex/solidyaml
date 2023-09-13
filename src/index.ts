import type { Plugin } from "rollup";
import { loader } from "./importer.js";

export interface Options {
  outputDtsToFolder?: string
}

export default function solidYaml(options?: Options): Plugin {
  return {
    name: 'vite-plugin-solidYaml',

    resolveId: async function (source, importer, options) {
      if (source.endsWith(".yml") || source.endsWith(".yaml")) {
        return source;
      }
    },

    load: loader(options)
    // transform: transformer
   }
}