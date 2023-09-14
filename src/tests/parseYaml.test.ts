import { loader } from "../importer";
import { it } from "vitest";

it("should", async () => {
  // arrange. The path is relative to the workspace root folder.
  const yamlPath = "tests/single.yaml";
  const that: any = { }

  // act
  const result = await loader({
    enableDts: true,
  }).call(that, yamlPath);

  // assert
  console.log(result);
})