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
    });
  }
}

module.exports = Sockets;
