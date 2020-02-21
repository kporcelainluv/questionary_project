import React, { Fragment } from "react";
import styled from "styled-components";
import { MediaWidth } from "../../consts";

const Label = styled.label`
  font-size: 16px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
  @media (min-width: ${MediaWidth.TABLET}) {
    margin-bottom: 20px;
  }
  textarea {
    padding-left: 10px;
    font-size: 18px;
    max-width: 300px;
    resize: none;
    border-radius: 25px;
    border: 1px solid #181919;
    @media (min-width: ${MediaWidth.TABLET}) {
      max-width: 650px;
      height: 50px;
    }
  }
  span {
    padding-left: 20px;
    max-width: 280px;
    margin-bottom: 10px;
    @media (min-width: ${MediaWidth.TABLET}) {
      max-width: 567px;
      margin-bottom: 10px;
    }
  }
`;
const Question = ({ question, name, updateStateValue }) => {
  return (
    <Label htmlFor={name}>
      <span>{question}</span>
      <textarea
        name={name}
        onChange={e => updateStateValue(name, e.target.value)}
      />
    </Label>
  );
};

export const QuestionaryText = ({ question, updateStateValue, index }) => {
  return (
    <Fragment>
      <Question
        key={`${question.name}-${index}`}
        name={question.name}
        question={question.question}
        updateStateValue={updateStateValue}
      />
    </Fragment>
  );
};
