import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const ItemAdd = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      socket.emit("create-item", { name: value });
      setValue("");
    }
  };

  return (
    <>
      <h3>Add Item</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="New Item"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};
