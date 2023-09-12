import { transformer } from "../src/transformer";
import { greetings } from "..";
import { expect, it, mock } from "bun:test";
import { PluginContext } from "rollup";

it("should say hello", () => {
  // act
  const say = greetings;

  // assert
  expect(say).toBe("Hello");
})

it("should", async () => {
  // arrange. The path is relative to the workspace root folder.
  const yamlPath = "tests/test.yaml";
  const sourceCode = "console.log('JS code...');"
  const that: any = { }

  // act
  const code = await transformer.call(that, sourceCode, yamlPath);
  console.log(code);
})