const ItemList = require("./item-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.itemList = new ItemList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log(`Client connected`);
      socket.emit("current-items", this.itemList.getItems());

      socket.on("vote-item", (id) => {
        this.itemList.addVotes(id);
        this.io.emit("current-items", this.itemList.getItems());
      });

      socket.on("remove-item", (id) => {
        this.itemList.removeItem(id);
        this.io.emit("current-items", this.itemList.getItems());
      });

      socket.on("change-item-name", ({ id, name }) => {
        this.itemList.changeName(id, name);
        this.io.emit("current-items", this.itemList.getItems());
      });

      socket.on("create-item", ({ name }) => {
        this.itemList.addItem(name);
        this.io.emit("current-items", this.itemList.getItems());
      });
    });
  }
}

module.exports = Sockets;
