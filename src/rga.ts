import { Identity } from "./identity";

export class Node {
  readonly value: string;
  next: Node | null;
  readonly id: Identity;

  constructor(value: string, id: Identity) {
    this.value = value;
    this.next = null;
    this.id = id;
  }
}

export class LinkedList {
  private head: Node | null = null;
  private counter: number = 0;
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  insertAtHead(value: string): void {
    const newNode = new Node(value, { clientId: this.clientId, counter: this.counter });

    newNode.next = this.head;
    this.head = newNode;

    this.counter += 1;
  }

  insertAtEnd(value: string): void {
    const newNode = new Node(value, { clientId: this.clientId, counter: this.counter });

    if (!this.head) {
      this.head = newNode;
      this.counter += 1;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;

    this.counter += 1;
  }

  deleteByValue(value: string): void {
    if (!this.head) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current: Node | null = this.head;
    let prev: Node | null = null;

    while (current !== null && current.value !== value) {
      prev = current;
      current = current.next;
    }

    if (current !== null && prev !== null) {
      prev.next = current.next;
    }
  }

  toArray(): string[] {
    let arr: string[] = [];

    if (!this.head) {
      return arr;
    }

    let current: Node | null = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    return arr;
  }
}
