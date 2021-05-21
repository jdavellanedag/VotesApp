import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ItemList } from "./components/ItemList";
import { ItemAdd } from "./components/ItemAdd";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:4756", {
    trasnports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(() => connectSocketServer());
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Server status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>
      <h1>Items list</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <ItemList />
        </div>
        <div className="col-4">
          <ItemAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
