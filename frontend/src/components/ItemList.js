import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const ItemList = () => {
  const createRows = () => {
    return (
      <tr>
        <td>
          <button className="btn btn-primary"> +1</button>
        </td>
        <td>
          <input className="form-control" />
        </td>
        <td>
          <h3>5</h3>
        </td>
        <td>
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    );
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
