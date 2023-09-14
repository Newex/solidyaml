import { sourceGen } from "../yaml_parser";
import { it, expect } from "vitest";

it("should replace illegal property name chars to underscore", () => {
  // arrange
  const yaml = "name-with-dashes: value";
  const expected = "export const name_with_dashes = \"value\"; const yaml = {\"name-with-dashes\":\"value\"}; export default yaml;";

  // act
  let actual = sourceGen(yaml);

  // assert
  expect(actual).toMatch(expected);
})