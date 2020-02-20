import React from "react";
import styled from "styled-components";
import { MediaWidth } from "../../consts";

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-family: "Montserrat", "PT Sans", sans-serif;
  
  input{
  font-size: 16px;
  }
  
  span{
  padding-left: 20px;
  max-width: 280px;
  margin-bottom: 10px;
  @media (min-width: ${MediaWidth.TABLET}) {
    max-width: 650px;
    height: 50px;
  }
`;

export const QuestionaryCheckbox = ({ heading, id, name, handleOnClick }) => {
  return (
    <Label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        name={id}
        onChange={() => {
          return handleOnClick(name, heading);
        }}
      />
      <span> {heading}</span>
    </Label>
  );
};
