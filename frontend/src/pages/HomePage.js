import React, { useContext } from "react";
import { ItemList } from "../components/ItemList";
import { ItemAdd } from "../components/ItemAdd";
import { SocketContext } from "../context/SocketContext";
import { ItemChart } from "../components/ItemChart";

function HomePage() {
  const { online } = useContext(SocketContext);

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
        <div className="col">
          <ItemChart />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <ItemList />
        </div>
        <div className="col-4">
          <ItemAdd />{" "}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
