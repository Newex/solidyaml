import type { PluginContext, LoadResult } from "rollup";
import fs from "fs";
import util from "util";
import { parse, parseAllDocuments } from "yaml";

const readFile = (filename: string) => util.promisify(fs.readFile)(filename, 'utf-8');

export const loader = async function loader(this: PluginContext, id: string): Promise<LoadResult> {
  if (id.endsWith(".yml") || id.endsWith(".yaml")) {
    try {
      const content = await readFile(id);
      let obj = null;
      let json = "";

      try {
        obj = parse(content);
        json = JSON.stringify(obj);
      } catch (error) {
        json += "[";
        obj = parseAllDocuments(content);
        for (let doc of obj) {
          json += JSON.stringify(doc);
          json += ","
        }
        json += "]";
      }

      let sb = `const yaml = ${json};`;
      sb += " export default yaml;";

      return sb;
    } catch (error) {

    }
  }
}