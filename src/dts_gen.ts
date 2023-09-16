#!/usr/bin/env node

import figlet from "figlet";
import fs from "fs";
import min from "minimist";
import path from "path";
import { Project } from "ts-morph";
import util from "util";
import { sourceGen } from "./yaml_parser.js";


const readFile = (filename: string) => util.promisify(fs.readFile)(filename, 'utf-8');
console.log(figlet.textSync("solid Yaml"));
const argv = min(process.argv.slice(2))

const yamlFileList = argv._;
const outputPath = argv.o;
const __dirname = process.cwd();

const run = async () => {
  // Handle input
  if (argv.i) {
    console.log("Current working directory: " + __dirname);
    return;
  }

  if (argv.h || yamlFileList.length == 0) {
    // Display help
    console.log("Usage: npx solidyaml [file] -o /output/dir");
    console.log("[file] is the yaml file input");
    console.log("");
    console.log("Arguments:");
    console.log("   -h        help message.");
    console.log("   -i        info show current working directory");
    console.log("   -o        optional path to output directory. If not given the output will be in the same directory as the input file.");
  }

  await loopFiles();
}

const loopFiles = async () => {
  for (const file of yamlFileList) {
    try {
      // Get file
      const filepath = path.resolve(__dirname, file);
      const extension = path.extname(filepath);
      if (!(extension.endsWith(".yml") || extension.endsWith(".yaml"))) {
        // skip non-yaml
        continue;
      }

      const content = await readFile(filepath);

      // Convert to JSON
      const code = sourceGen(content);

      // Create typedefinitions
      await generator(code, filepath);
    } catch (error) {
      console.error(error);
    }
  }
}

export const generator = async function(code: string, file: string) {

  const filename = path.basename(file);
  const outDir = path.resolve(__dirname, outputPath ?? ".");

  console.log(file);
  await deleteFileIfExists(file + ".d.ts");

  const project = new Project({
    compilerOptions: {
      outDir: outDir,
      declaration: true,
      noEmit: false,
    }
  });

  const yamlTs = filename + ".ts";

  try {
    let moduleSrc = "declare module '*" + filename + "' {\n" + code + "\n}";
    project.createSourceFile(yamlTs, moduleSrc);
    project.emitSync({ emitOnlyDtsFiles: true });
    console.log("Created typedefinition " + filename + ".d.ts");
  } catch (error) {
    console.error(error);
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

run();