import React from "react";
import styled from "styled-components";
import { MediaWidth } from "../../consts";

const Label = styled.label`
  font-size: 16px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  padding: 10px;
  cursor: pointer;

  input {
    font-size: 18px;
  }

  span {
    padding-left: 20px;
    max-width: 280px;
    margin-bottom: 13px;
    @media (min-width: ${MediaWidth.TABLET}) {
      max-width: 650px;
      height: 50px;
    }
  }
`;

export const QuestionaryRadio = ({ id, name, value, handleOnClick }) => {
  return (
    <Label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={() => {
          return handleOnClick(name, value);
        }}
      />
      <span>{value}</span>
    </Label>
  );
};
