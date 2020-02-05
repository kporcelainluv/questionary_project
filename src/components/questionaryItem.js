import React from "react";

export const QuestionaryItem = ({ id, heading, value = undefined }) => {
  return (
    <li>
      <label htmlFor={id}>
        {heading}
        <input type="text" id={id} />
      </label>
    </li>
  );
};
