import React from "react";

export const QuestionaryRadio = ({ id, name, value, text }) => {
  return (
    <label htmlFor={id}>
      {text}
      <input type="radio" id={id} name={name} value={value} />
    </label>
  );
};
