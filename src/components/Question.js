import React, { Fragment } from "react";
import styled from "styled-components";

import { MediaWidth } from "../consts";

const LabelText = styled.label`
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

export const Text = ({ question, updateStateValue }) => {
  const { name } = question;
  return (
    <LabelText htmlFor={name}>
      <span>{question.question}</span>
      <textarea
        name={name}
        onChange={e => updateStateValue(name, e.target.value)}
      />
    </LabelText>
  );
};

const LabelRadio = styled.label`
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

export const Radio = ({ question, updateStateValue }) => {
  return (
    <Fragment>
      <span> {question.question} </span>
      {question.options.map((option, index) => {
        const { name } = question;
        const key = name + index;
        const id = name + index;

        return (
          <LabelRadio key={key} htmlFor={id}>
            <input
              type="radio"
              id={id}
              name={name}
              value={option}
              onChange={() => updateStateValue(name, option)}
            />
            <span>{option}</span>
          </LabelRadio>
        );
      })}
    </Fragment>
  );
};

const LabelCheckbox = styled.label`
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

export const Checkbox = ({ question, updateCheckboxValue }) => {
  return (
    <Fragment>
      <span> {question.question} </span>
      {question.options.map((option, index) => {
        const { name } = question;
        const key = name + index;
        const id = name + index;

        return (
          <LabelCheckbox key={key} htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              name={name}
              onChange={() => {
                return updateCheckboxValue(name, option);
              }}
            />
            <span>{option}</span>
          </LabelCheckbox>
        );
      })}
    </Fragment>
  );
};
