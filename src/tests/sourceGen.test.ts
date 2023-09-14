import { sourceGen } from "../yaml_parser";
import { it, expect } from "vitest";

it("should replace illegal property name chars to underscore", () => {
  // arrange
  const yaml = "name-with-dashes: value";
  const anyDashes = /[\-]*/;

  // act
  let actual = sourceGen(yaml);

  // assert
  expect(actual).to.not.match(anyDashes);
})