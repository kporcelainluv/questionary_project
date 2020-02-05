import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 16px;
  font-family: Arial, serif;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  font-family: Arial, serif;
`;

export const QuestionaryCheckbox = ({ heading, id, name, handleOnClick }) => {
  return (
    <Label htmlFor={id}>
      <Input
        type="checkbox"
        id={id}
        name={id}
        onChange={() => {
          return handleOnClick(name, heading);
        }}
      />
      {heading}
    </Label>
  );
};
