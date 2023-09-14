import { Project } from "ts-morph";
import path from "path";
import fs from "fs";
import util from "util";
import { PluginContext } from "rollup";
import { Options } from "./index.js";


export const generator = async function(this: PluginContext, code: string, id: string, options?: Options) {
  const filename = path.basename(id);

  let output = "";

  const project = new Project({
    compilerOptions: {
      outDir: output,
      declaration: true,
      noEmit: true,
      noEmitOnError: true,
    }
  });

  const yamlTs = filename + ".ts";

  try {
    let moduleSrc = "declare module '*" + filename + "' {\n" + code + "\n}";
    project.createSourceFile(yamlTs, moduleSrc);
    const result = project.emitToMemory({ emitOnlyDtsFiles: true });
    for (const file of result.getFiles()) {
      this.info("====== Start: " + filename + ".d.ts ======");
      this.info(file.text);
      this.info("====== End: " + filename + ".d.ts ======\n");
    }

  } catch (error) {
    this.error("Could not create typescript declarations for " + filename + "\n" + error);
  }
}

const unlink = (filepath: string) => util.promisify(fs.unlink)(filepath)
const deleteFileIfExists = async (filePath: string) => {
  try {
    await unlink(filePath);
  } catch (error) {
    // Does not exists? yay!
  }
}