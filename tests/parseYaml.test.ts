import { greetings } from "..";
import { expect, it } from "bun:test";

it("should say hello", () => {
  // act
  const say = greetings;

  // assert
  expect(say).toBe("Hello");
})