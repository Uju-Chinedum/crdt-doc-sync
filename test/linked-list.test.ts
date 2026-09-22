import { LinkedList } from "../src/linked-list";

describe("Linked List Data Structure", () => {
  it("should create an empty list array", () => {
    const list = new LinkedList();

    expect(list.toArray()).toEqual([]);
  });

  it("should insert values at the end in order", () => {
    const list = new LinkedList();

    list.insertAtEnd("a");
    expect(list.toArray()).toEqual(["a"]);

    list.insertAtEnd("b");
    expect(list.toArray()).toEqual(["a", "b"]);

    list.insertAtEnd("c");
    expect(list.toArray()).toEqual(["a", "b", "c"]);
  });

  it("should insert a value at the head", () => {
    const list = new LinkedList();

    list.insertAtEnd("a");
    list.insertAtEnd("b");
    list.insertAtEnd("c");

    list.insertAtHead("z")
    expect(list.toArray()).toEqual(["z", "a", "b", "c"]);
  });

  it("should delete a value in the middle", () => {
    const list = new LinkedList();

    list.insertAtEnd("a");
    list.insertAtEnd("b");
    list.insertAtEnd("c");
    list.insertAtHead("z")

    list.deleteByValue("b")
    expect(list.toArray()).toEqual(["z", "a", "c"]);
  });

  it("should delete a value at the head", () => {
    const list = new LinkedList();

    list.insertAtEnd("a");
    list.insertAtEnd("b");
    list.insertAtEnd("c");
    list.insertAtHead("z")

    list.deleteByValue("z")
    expect(list.toArray()).toEqual(["a", "b", "c"]);
  });

  it("should return the current list when the value does not exist", () => {
    const list = new LinkedList();

    list.insertAtEnd("a");
    list.insertAtEnd("b");
    list.insertAtEnd("c");
    list.insertAtHead("z")

    list.deleteByValue("y")
    expect(list.toArray()).toEqual(["z", "a", "b", "c"]);
  });
});
