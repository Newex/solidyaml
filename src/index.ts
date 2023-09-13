import type { Plugin } from "rollup";
import fs from "fs";
import util from "util";
import { parse, parseAllDocuments } from "yaml";
import { loader } from "./importer.js";
import type { Plugin as VitePlugin } from "vite"

const readFile = (filename: string) => util.promisify(fs.readFile)(filename, 'utf-8');

export default function solidYaml(): VitePlugin {
  return {
    name: 'vite-plugin-solidYaml',

    enforce: "pre",

    resolveId: async function (source, importer, options) {
      if (source.endsWith(".yml") || source.endsWith(".yaml")) {
        return source;
      }
    },

    load: loader
    // transform: transformer
   }
}