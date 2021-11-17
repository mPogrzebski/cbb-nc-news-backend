const { getValuesFromObject } = require("../db/utils/data-manipulation");

describe("Testing of util functions", () => {
  describe("getValuesFromObject", () => {
    test("should return nexted array of values from array of objects ", () => {
      const obj = [
        {
          a: 1,
          b: "2",
          c: "c",
        },
        {
          1: "a",
          2: "b",
          3: "c",
        },
      ];
      expect(getValuesFromObject(obj)).toEqual([
        [1, "2", "c"],
        ["a", "b", "c"],
      ]);
    });
  });
});
