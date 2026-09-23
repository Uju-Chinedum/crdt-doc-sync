import { RgaList } from "../src/rga";

describe("RGA concurrent convergence", () => {
  it("converges when two clients concurrently insert after the same anchor, in different apply order", () => {
    const listA = new RgaList("client-a");
    const listB = new RgaList("client-b");

    // Seed both lists with the exact same base node — same id on both sides.
    const aId = { clientId: "shared", counter: 0 };
    listA.insertAfter(null, aId, "a");
    listB.insertAfter(null, aId, "a");

    // Two concurrent operations, both anchored to "a" — this is the real conflict.
    const xId = { clientId: "client-a", counter: 1 };
    const yId = { clientId: "client-b", counter: 1 };

    // listA applies its own op first, then B's arrives after.
    listA.insertAfter(aId, xId, "x");
    listA.insertAfter(aId, yId, "y");

    // listB applies its own op first, then A's arrives after — opposite order.
    listB.insertAfter(aId, yId, "y");
    listB.insertAfter(aId, xId, "x");

    expect(listA.toArray()).toEqual(listB.toArray());
  });
});
