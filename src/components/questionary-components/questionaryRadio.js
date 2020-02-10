import React from "react";
import styled from "styled-components";
import { MediaWidth } from "../../consts";

const Label = styled.label`
  font-size: 16px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  padding: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  font-size: 18px;
  font-family: "Montserrat", "PT Sans", sans-serif;
`;
const QuestionWrap = styled.span`
  padding-left: 20px;
  max-width: 280px;
  margin-bottom: 13px;
  @media ${MediaWidth.TABLET} {
    max-width: 650px;
    height: 50px;
  }
`;

export const QuestionaryRadio = ({ id, name, value, handleOnClick }) => {
  return (
    <Label htmlFor={id}>
      <Input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={() => {
          return handleOnClick(name, value);
        }}
      />
      <QuestionWrap>{value}</QuestionWrap>
    </Label>
  );
};
