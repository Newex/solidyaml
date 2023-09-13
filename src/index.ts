import type { Plugin } from "rollup";
import { loader } from "./importer.js";


export default function solidYaml(): Plugin {
  return {
    name: 'vite-plugin-solidYaml',

    resolveId: async function (source, importer, options) {
      if (source.endsWith(".yml") || source.endsWith(".yaml")) {
        return source;
      }
    },

    load: loader
    // transform: transformer
   }
}