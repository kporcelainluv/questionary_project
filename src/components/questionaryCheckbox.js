import React from "react";

export const questionaryCheckbox = ({ heading, id }) => {
  return (
    <li>
      <label htmlFor={id}>
        {heading}
        <input type="checkbox" id={id} />
      </label>
    </li>
  );
};
