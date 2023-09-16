import type { Plugin } from "rollup";
import { loader } from "./importer.js";

export default function solidYaml(): Plugin {
  return {
    name: 'vite-plugin-solidYaml',
    version: "0.0.7",

    resolveId: async function (source, _importer, _options) {
      if (source.endsWith(".yml") || source.endsWith(".yaml")) {
        return source;
      }
    },

    load: loader()
   }
}