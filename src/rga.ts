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
    let current: RgaNode | null = this.head;

    while (current !== null) {
      if (compareIds(current.id, id) === 0) {
        current.deleted = true;
        return;
      }
      current = current.next;
    }
  }

  toArray(): string[] {
    return this.buildArray(false);
  }

  toArrayWithDeleted(): string[] {
    return this.buildArray(true);
  }
}
