import React, { useState } from "react";

export const ItemAdd = ({ add }) => {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      add(value);
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
