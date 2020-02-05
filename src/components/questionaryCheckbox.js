import React from "react";

export const QuestionaryCheckbox = ({ heading, id }) => {
  return (
    <label htmlFor={id}>
      {heading}
      <input type="checkbox" id={id} name={id} />
    </label>
  );
};
