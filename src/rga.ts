import { compareIds, Identity } from "./identity";

export class RgaNode {
  readonly value: string;
  next: RgaNode | null;
  readonly id: Identity;
  deleted: boolean;

  constructor(value: string, id: Identity) {
    this.value = value;
    this.next = null;
    this.id = id;
    this.deleted = false;
  }
}

export class RgaList {
  private head: RgaNode | null = null;
  private counter: number = 0;
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  private buildArray(includeDeleted: boolean): string[] {
    const arr: string[] = [];
    let current: RgaNode | null = this.head;

    while (current) {
      if (includeDeleted || !current.deleted) {
        arr.push(current.value);
      }
      current = current.next;
    }

    return arr;
  }

  private findNodeById(id: Identity): RgaNode | null {
    let current: RgaNode | null = this.head;

    while (current !== null) {
      if (compareIds(current.id, id) === 0) {
        return current;
      }
      current = current.next;
    }
    return current;
  }

  insertAtHead(value: string): Identity {
    const newNode = new RgaNode(value, { clientId: this.clientId, counter: this.counter });

    newNode.next = this.head;
    this.head = newNode;

    this.counter += 1;
    return newNode.id;
  }

  insertAtEnd(value: string): Identity {
    const newNode = new RgaNode(value, { clientId: this.clientId, counter: this.counter });

    if (!this.head) {
      this.head = newNode;
      this.counter += 1;
      return newNode.id;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;

    this.counter += 1;
    return newNode.id;
  }

  deleteById(id: Identity): void {
    const node = this.findNodeById(id);
    if (node) {
      node.deleted = true;
    }

    return;
  }

  toArray(): string[] {
    return this.buildArray(false);
  }

  toArrayWithDeleted(): string[] {
    return this.buildArray(true);
  }

  insertAfter(anchorId: Identity | null, id: Identity, value: string): Identity {
    const newNode = new RgaNode(value, id);

    if (anchorId === null) {
      newNode.next = this.head;
      this.head = newNode;
      return newNode.id;
    }

    const anchor = this.findNodeById(anchorId);
    if (!anchor) {
      throw new Error("Target ID node not found in RGA list.");
    }

    let prev = anchor;
    let current = anchor.next;

    while (current !== null && compareIds(id, current.id) > 0) {
      prev = current;
      current = current.next;
    }

    newNode.next = current;
    prev.next = newNode;

    return newNode.id;
  }
}
