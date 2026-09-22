import { LinkedList } from "./linked-list";

const list = new LinkedList();
list.insertAtEnd("a");
list.insertAtEnd("b");
list.insertAtHead("z");
console.log(list.toArray());
list.deleteByValue("a");
console.log(list.toArray());
