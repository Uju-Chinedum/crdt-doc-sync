import { RgaList } from "../src/rga";

describe("RGA", () => {
  it("should create an empty list array", () => {
    const list = new RgaList("client-a");

    expect(list.toArray()).toEqual([]);
  });

  it("should insert values at the end in order", () => {
    const list = new RgaList("client-a");

    list.insertAtEnd("a");
    expect(list.toArray()).toEqual(["a"]);

    list.insertAtEnd("b");
    expect(list.toArray()).toEqual(["a", "b"]);

    list.insertAtEnd("c");
    expect(list.toArray()).toEqual(["a", "b", "c"]);
  });

  it("should insert a value at the head", () => {
    const list = new RgaList("client-a");

    list.insertAtEnd("a");
    list.insertAtEnd("b");
    list.insertAtEnd("c");
    list.insertAtHead("z");

    expect(list.toArray()).toEqual(["z", "a", "b", "c"]);
  });

  it("should delete a node by id and exclude it from toArray", () => {
    const list = new RgaList("client-a");

    list.insertAtEnd("a");
    const bId = list.insertAtEnd("b");
    list.insertAtEnd("c");

    list.deleteById(bId);

    expect(list.toArray()).toEqual(["a", "c"]);
  });

  it("should delete the head node by id", () => {
    const list = new RgaList("client-a");

    const aId = list.insertAtHead("a");
    list.insertAtEnd("b");

    list.deleteById(aId);

    expect(list.toArray()).toEqual(["b"]);
  });

  it("should do nothing when deleting an id that doesn't exist", () => {
    const list = new RgaList("client-a");

    list.insertAtEnd("a");
    list.insertAtEnd("b");

    list.deleteById({ clientId: "nonexistent", counter: 999 });

    expect(list.toArray()).toEqual(["a", "b"]);
  });

  it("should include deleted nodes when using toArrayWithDeleted", () => {
    const list = new RgaList("client-a");

    list.insertAtEnd("a");
    const bId = list.insertAtEnd("b");
    list.insertAtEnd("c");

    list.deleteById(bId);

    expect(list.toArray()).toEqual(["a", "c"]);
    expect(list.toArrayWithDeleted()).toEqual(["a", "b", "c"]);
  });

  it("should insert after a node", () => {
    const list = new RgaList("client-a");

    const aId = list.insertAtEnd("a");
    list.insertAtEnd("c");
    expect(list.toArray()).toEqual(["a", "c"]);

    list.insertAfter(aId, { clientId: "client-a", counter: 1 }, "b");
    expect(list.toArray()).toEqual(["a", "b", "c"]);
  });

  it("should throw an error is id not found", () => {
    const list = new RgaList("client-a");

    list.insertAtEnd("a");
    list.insertAtEnd("c");

    expect(() =>
      list.insertAfter(
        { clientId: "client-a", counter: 50 },
        { clientId: "client-a", counter: 100 },
        "b",
      ),
    ).toThrow("Target ID node not found in RGA list.");
  });
});
