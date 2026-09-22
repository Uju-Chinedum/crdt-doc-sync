import { compareIds, Identity } from "../src/identity";

describe("IDs Comparison", () => {
  it("should return id_one", () => {
    const id_one: Identity = {
      clientId: "A",
      counter: 2,
    };

    const id_two: Identity = {
      clientId: "B",
      counter: 3,
    };

    expect(compareIds(id_one, id_two)).toEqual(-1);
  });

  it("should return id_two", () => {
    const id_one: Identity = {
      clientId: "A",
      counter: 3,
    };

    const id_two: Identity = {
      clientId: "B",
      counter: 2,
    };

    expect(compareIds(id_one, id_two)).toEqual(1);
  });

  it("should return id_one", () => {
    const id_one: Identity = {
      clientId: "A",
      counter: 2,
    };

    const id_two: Identity = {
      clientId: "B",
      counter: 2,
    };

    expect(compareIds(id_one, id_two)).toEqual(-1);
  });

  it("should return id_two", () => {
    const id_one: Identity = {
      clientId: "B",
      counter: 2,
    };

    const id_two: Identity = {
      clientId: "A",
      counter: 2,
    };

    expect(compareIds(id_one, id_two)).toEqual(1);
  });

  it("should return equal", () => {
    const id_one: Identity = {
      clientId: "A",
      counter: 2,
    };

    const id_two: Identity = {
      clientId: "A",
      counter: 2,
    };

    expect(compareIds(id_one, id_two)).toEqual(0);
  });
});
