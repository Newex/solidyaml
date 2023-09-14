import type { PluginContext, LoadResult } from "rollup";
import fs from "fs";
import util from "util";
import { Options } from "./index.js";
import { sourceGen } from "./yaml_parser.js";

const readFile = (filename: string) => util.promisify(fs.readFile)(filename, 'utf-8');

export const loader = (options?: Options) => async function loader(this: PluginContext, id: string): Promise<LoadResult> {
  if (id.endsWith(".yml") || id.endsWith(".yaml")) {
    try {
      const content = await readFile(id);
      const code = sourceGen(content);
      return code;
    } catch (error) {
      this.error(JSON.stringify(error));
    }
  }
}
