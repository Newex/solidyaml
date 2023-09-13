import { transformer } from "../transformer";
import { it } from "bun:test";

it("should", async () => {
  // arrange. The path is relative to the workspace root folder.
  const yamlPath = "tests/test.yaml";
  const sourceCode = "console.log('JS code...');"
  const that: any = { }

  // act
  const code = await transformer.call(that, sourceCode, yamlPath);
  console.log(code.code);
})