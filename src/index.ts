import type { Plugin } from "rollup";
import { loader } from "./importer.js";

export interface Options {
  outputDtsToDir?: string,
  enableDts?: boolean,
  sameAsYamlDir?: boolean
}

const defaultOptions: Options = {
  enableDts: false,
  sameAsYamlDir: true
}

export default function solidYaml(options?: Options): Plugin {
  options = Object.assign({}, defaultOptions, options);

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