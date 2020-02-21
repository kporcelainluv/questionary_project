import React, { Fragment } from "react";
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

const Question = ({ heading, id, name, updateCheckboxValue }) => {
  return (
    <Label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        name={id}
        onChange={() => {
          return updateCheckboxValue(name, heading);
        }}
      />
      <span> {heading}</span>
    </Label>
  );
};

export const QuestionaryCheckbox = ({ question, updateCheckboxValue }) => {
  return (
    <Fragment>
      <span> {question.question} </span>
      {question.options.map((option, index) => {
        return (
          <Question
            key={`${question.name}-${index}`}
            id={`${option}-${index}`}
            heading={option}
            name={question.name}
            updateCheckboxValue={updateCheckboxValue}
          />
        );
      })}
    </Fragment>
  );
};
