import React from "react";

export const QuestionaryItem = ({ name, question }) => {
  return (
    <label htmlFor={name}>
      {question}
      <input type="text" id={name} />
    </label>
  );
};
