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

const Question = ({ id, name, value, updateStateValue }) => {
  return (
    <Label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={() => {
          return updateStateValue(name, value);
        }}
      />
      <span>{value}</span>
    </Label>
  );
};

export const QuestionaryRadio = ({ question, updateStateValue }) => {
  return (
    <li key={question.name}>
      <span> {question.question} </span>
      {question.options.map((option, index) => {
        return (
          <Question
            key={`${question.name}${index}`}
            id={`${question.name}${index}`}
            name={question.name}
            value={option}
            updateStateValue={updateStateValue}
          />
        );
      })}
    </li>
  );
};
