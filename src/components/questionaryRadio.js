import React from "react";

export const QuestionaryRadio = ({ id, name, value, text, handleOnClick }) => {
  return (
    <label htmlFor={id}>
      {text}
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={() => {
          return handleOnClick(name, value);
        }}
      />
    </label>
  );
};
