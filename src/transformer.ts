import fs from "fs";
import MagicString from "magic-string";
import { PluginContext, TransformResult } from "rollup";
import util from "util";
import { parse } from "yaml";

const readFile = (filename: string) => util.promisify(fs.readFile)(filename, 'utf-8');
const yamlExtension = /\.ya?ml$/;

export const transformer = async function transform(this: PluginContext, source: string, id: string): Promise<TransformResult> {
  if (yamlExtension.test(id)) {
    try {
      const content = await readFile(id);
      const obj: Object = parse(content);
      const str = JSON.stringify(obj);
      const magic = new MagicString(source);
      magic.append(`const yaml = ${str};`);
      console.log(str);

      return {
        code: magic.toString(),
        map: magic.generateMap()
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return null;
}