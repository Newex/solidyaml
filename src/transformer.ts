import MagicString from "magic-string";
import { PluginContext, TransformResult } from "rollup";
import tosource from "tosource";
import { parse } from "yaml";

const yamlExtension = /\.ya?ml$/;

export const transformer = async function transform(this: PluginContext, source: string, id: string): Promise<TransformResult> {
  if (yamlExtension.test(id)) {
    const yaml = Bun.file(id);
    try {
      const exists = await yaml.exists();
      if (!exists) {
        throw Error("File not found: " + id);
      }

      const content = await yaml.text();
      const obj = parse(content);
      const str = tosource(obj)
      const magic = new MagicString(source);
      magic.append(`const yaml = ${str};`);

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
