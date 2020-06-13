import { genFirebaseConfig } from "./Firebase";

describe("Firebase", () => {
  describe("genFirebaseConfig", () => {
    test("exception", () => {
      // @ts-expect-error
      expect(() => genFirebaseConfig("")).toThrowError();
    });
  });
});
