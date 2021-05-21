const Item = require("./item");

class ItemList {
  constructor() {
    this.items = [new Item("Item 1"), new Item("Item 2"), new Item("Item 3"), new Item("Item 4")];
  }

  addItem(name) {
    const newItem = new Item(name);
    this.items.push(newItem);
    return this.items;
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getItems() {
    return this.items;
  }

  addVotes(id) {
    this.items = this.items.map((item) => {
      if (item.id === id) {
        item.votes += 1;
      }
      return item;
    });
  }

  changeName(id, newName) {
    this.items = this.items.map((item) => {
      if (item.id === id) {
        item.name = newName;
      }
      return item;
    });
  }
}

module.exports = ItemList;
