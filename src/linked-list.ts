export class Node {
  value: string;
  next: Node | null;

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  private head: Node | null = null;

  insertAtHead(value: string): void {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtEnd(value: string): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
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
