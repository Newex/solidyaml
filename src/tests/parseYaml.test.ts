import { loader } from "../importer";
import { it } from "vitest";

it("should", async () => {
  // arrange. The path is relative to the workspace root folder.
  const yamlPath = "tests/single.yaml";
  const that: any = {
    info: (msg: string) => { console.log(msg); }
  }

  // act
  const result = await loader().call(that, yamlPath);

  // assert
  console.log(result);
})