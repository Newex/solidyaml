import { Project } from "ts-morph";
import path from "path";
import { Options } from "./index.js";
import fs from "fs";
import util from "util";


export const generator = async (code: string, id: string, options?: Options) => {
  const filename = path.basename(id);
  const { outputDtsToDir: folder, sameAsYamlDir: same } = options ?? { };

  let output = "";
  if (same) {
    // Same directory as the yaml file
    output = path.dirname(id);
  } else {
    // To the specified (or fallback) directory
    output = path.join(__dirname, folder ?? ".");
  }

  // const extension = path.extname(id);
  const outputFilePath = path.resolve(output, filename + ".d.ts");
  await deleteFileIfExists(outputFilePath);

  const project = new Project({
    compilerOptions: {
      outDir: output,
      declaration: true,
      noEmit: false,
      noEmitOnError: false,
    }
  });

  const yamlTs = filename + ".ts";

  try {
    let moduleSrc = "declare module '*" + filename + "' {\n" + code + "\n}";
    project.createSourceFile(yamlTs, moduleSrc);
    const single = project.getSourceFileOrThrow(yamlTs);
    await single.emit({ emitOnlyDtsFiles: true });
  } catch (error) {
    console.error(error)
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