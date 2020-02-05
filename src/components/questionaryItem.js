import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 16px;
  font-family: Arial, serif;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 16px;
  font-family: Arial, serif;
  max-width: 250px;
  margin-top: 10px;
`;

export const QuestionaryItem = ({ name, question }) => {
  return (
    <Label htmlFor={name}>
      {question}
      <Input type="text" id={name} />
    </Label>
  );
};
