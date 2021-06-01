import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../context/SocketContext";

export const ItemList = () => {
  const { socket } = useContext(SocketContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    socket.on("current-items", (items) => {
      setItems(items);
    });
    return () => socket.off("current-items");
  }, [socket]);

  const handleChangeName = (event, id) => {
    const newName = event.target.value;
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          item.name = newName;
        }
        return item;
      })
    );
  };

  const onStopFocus = (id, name) => {
    socket.emit("change-item-name", { id, name });
  };

  const vote = (id) => {
    socket.emit("vote-item", id);
  };

  const remove = (id) => {
    socket.emit("remove-item", id);
  };

  const createRows = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td>
          <button className="btn btn-primary" onClick={() => vote(item.id)}>
            {" "}
            +1
          </button>
        </td>
        <td>
          <input
            value={item.name}
            className="form-control"
            onChange={(event) => handleChangeName(event, item.id)}
            onBlur={() => onStopFocus(item.id, item.name)}
          />
        </td>
        <td>
          <h3>{item.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => remove(item.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
