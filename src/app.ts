import { compareIds, Identity } from "./identity";
import { LinkedList } from "./linked-list";

const list = new LinkedList();
list.insertAtEnd("a");
list.insertAtEnd("b");
list.insertAtHead("z");
console.log(list.toArray());
list.deleteByValue("a");
console.log(list.toArray());

const id_one: Identity = {
  clientId: "A",
  counter: 2,
};
const id_two: Identity = {
  clientId: "B",
  counter: 3,
};
console.log(compareIds(id_two, id_one));
