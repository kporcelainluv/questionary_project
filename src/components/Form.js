import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import nanoid from "nanoid";

import {
  QuestionaryList,
  MediaWidth,
  QuestionResponse,
  QuestionType
} from "../consts";
import { QuestionaryText } from "./questionary-components/questionaryText";
import { QuestionaryRadio } from "./questionary-components/questionaryRadio";
import { QuestionaryCheckbox } from "./questionary-components/questionaryCheckbox";
import { FormCompletion } from "./formCompletion";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: #181919;
  max-width: 350px;
  font-family: "Montserrat", "PT Sans", sans-serif;

  @media (min-width: ${MediaWidth.TABLET}) {
    max-width: 650px;
    margin: auto;
  }
  h2 {
    display: flex;
    margin-top: 40px;
    padding: 10px;
    justify-content: center;
  }
  p {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 10px;
    line-height: 25px;
    text-align: center;
    max-width: 310px;
    @media (min-width: ${MediaWidth.TABLET}) {
      max-width: 650px;
      margin: auto;
    }
  }
  button {
    background-color: #181919;
    height: 50px;
    display: flex;
    margin: 20px auto 50px;
    justify-content: center;
    color: white;
    border-radius: 25px;
    border: 3px solid white;
    width: 300px;
    font-size: 18px;
    @media (min-width: ${MediaWidth.TABLET}) {
      width: 567px;
      height: 55px;
    }
  }
  fieldset {
    border: none;
    margin-bottom: 20px;
  }
  legend {
    font-weight: 600;
    margin: 20px auto;
    font-size: 18px;
    text-align: center;
  }
  ol {
    padding-left: 0;
  }
  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: 25px;
  }
  span {
    padding-left: 20px;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Question = ({
  question,
  state,
  updateStateValue,
  updateCheckboxValue
}) => {
  if (question.type === QuestionType.TEXT) {
    return (
      <QuestionaryText
        key={question.name}
        question={question}
        updateStateValue={updateStateValue}
      />
    );
  } else if (question.type === QuestionType.RADIO) {
    return (
      <QuestionaryRadio
        key={question.name}
        question={question}
        updateStateValue={updateStateValue}
      />
    );
  } else if (question.type === QuestionType.CHECKBOX) {
    return (
      <QuestionaryCheckbox
        key={question.name}
        question={question}
        updateCheckboxValue={updateCheckboxValue}
      />
    );
  } else if (
    question.type === QuestionType.TEST &&
    state[question.name] === QuestionResponse.TRUE
  ) {
    return (
      <Question
        question={question.true}
        state={state}
        updateCheckboxValue={updateCheckboxValue}
        updateStateValue={updateStateValue}
      />
    );
  } else if (
    question.type === QuestionType.TEST &&
    state[question.name] === QuestionResponse.FALSE
  ) {
    return (
      <Question
        question={question.false}
        state={state}
        updateCheckboxValue={updateCheckboxValue}
        updateStateValue={updateStateValue}
      />
    );
  }
  return null;
};

export const Form = () => {
  const [state, setState] = useState({
    id: nanoid(),
    date: new Date(),
    formIsCompleted: false
  });

  const updateStateValue = (name, value) => {
    setState(s => ({
      ...s,
      [name]: value
    }));
  };

  const updateCheckboxValue = (name, value) => {
    setState(s => ({
      ...s,
      [name]: [...(s[name] || []), value]
    }));
  };

  const survey = firebase.firestore().doc(`survey-results/${state.id}`);

  console.log({ state });
  return (
    <div>
      {state.formIsCompleted && <FormCompletion />}
      {!state.formIsCompleted && (
        <Container>
          <h2>Форма знакомства</h2>
          <p>
            Перед нашей встречей мне бы хотелось познакомиться с вами и вашей
            косметичкой. Тогда занятие произойдет наиболее плодотворно.
          </p>
          <form
            onSubmit={e => {
              e.preventDefault();
              survey.set(state).then(() => {});
              setState(s => ({
                ...s,
                formIsCompleted: true
              }));
            }}
          >
            {QuestionaryList.map(section => {
              return (
                <fieldset key={section.name}>
                  <legend>{section.name}</legend>
                  <ol>
                    {section.questions.map(question => {
                      console.log({ question });
                      return (
                        <li key={question.question}>
                          <Question
                            question={question}
                            state={state}
                            updateStateValue={updateStateValue}
                            updateCheckboxValue={updateCheckboxValue}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </fieldset>
              );
            })}
            <button type="submit">Отправить</button>
          </form>
        </Container>
      )}
    </div>
  );
};
