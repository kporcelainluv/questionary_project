import React, { useState, useEffect } from "react";
import {
  QuestionaryList,
  MediaWidth,
  QuestionResponse,
  QuestionType
} from "../consts";
import { QuestionaryItem } from "./questionary-components/questionaryItem";
import { QuestionaryRadio } from "./questionary-components/questionaryRadio";
import { QuestionaryCheckbox } from "./questionary-components/questionaryCheckbox";
import { FormCompletion } from "./formCompletion";
import styled from "styled-components";
import firebase from "firebase";
import nanoid from "nanoid";

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

export const Form = () => {
  const [state, setState] = useState({
    id: undefined,
    name: null,
    age: null,
    skincareType: null,
    skincareProducts: null,
    skincareCleanser: null,
    base: null,
    foundation: null,
    foundationPreference: null,
    foundationNotUsed: null,
    concealerUsage: null,
    concealerNotUsed: null,
    powderUsage: null,
    powderNotUsed: null,
    powderPreference: null,
    blush: null,
    blushNotUsed: null,
    blushPreference: null,
    contour: null,
    contourNotUsed: null,
    contourPreference: null,
    lipstick: null,
    highlighterUsage: null,
    highlighterNotUsed: null,
    highlighterPreference: null,
    browsPreference: null,
    eyesPreference: null,
    toolsPreference: null,
    userOwnedProducts: null,
    frequency: null,
    expectations: null,
    date: new Date(),
    formIsCompleted: false
  });

  useEffect(() => {
    setState(s => ({
      ...s,
      id: nanoid()
    }));
  }, []);

  const updateStateValue = (name, value) => {
    setState(s => ({
      ...s,
      [name]: value
    }));
  };

  // TODO: Refactor
  const updateCheckboxValue = (name, value) => {
    if (state[name]) {
      const list = state[name].concat(" " + value);
      setState(s => ({
        ...s,
        [name]: list
      }));
    } else {
      updateStateValue(name, value);
    }
  };

  const survey = firebase.firestore().doc(`survey-results/${state.id}`);

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
          <form action="">
            {QuestionaryList.map(section => {
              return (
                <fieldset key={section.name}>
                  <legend>{section.name}</legend>
                  <ol>
                    {section.questions.map((question, index) => {
                      // TODO: Refactor
                      if (question.type === QuestionType.TEST) {
                        if (state[question.name] === null) {
                          return null;
                        } else if (
                          state[question.name] === QuestionResponse.TRUE
                        ) {
                          question = question.yes;
                        } else if (
                          state[question.name] === QuestionResponse.FALSE
                        ) {
                          question = question.no;
                        }
                      }
                      if (question.type === QuestionType.TEXT) {
                        return (
                          <li key={question.name}>
                            <QuestionaryItem
                              key={`${question.name}-${index}`}
                              name={question.name}
                              question={question.question}
                              handleOnClick={updateStateValue}
                            />
                          </li>
                        );
                      } else if (question.type === QuestionType.RADIO) {
                        return (
                          <li key={question.name}>
                            <span> {question.question} </span>
                            {question.options.map((option, index) => {
                              return (
                                <QuestionaryRadio
                                  key={`${question.name}${index}`}
                                  id={`${question.name}${index}`}
                                  name={question.name}
                                  value={option}
                                  handleOnClick={updateStateValue}
                                />
                              );
                            })}
                          </li>
                        );
                      } else if (question.type === QuestionType.CHECKBOX) {
                        return (
                          <li key={question.name}>
                            <span> {question.question} </span>
                            {question.options.map((option, index) => {
                              return (
                                <QuestionaryCheckbox
                                  key={`${question.name}-${index}`}
                                  id={`${option}-${index}`}
                                  heading={option}
                                  name={question.name}
                                  handleOnClick={updateCheckboxValue}
                                />
                              );
                            })}
                          </li>
                        );
                      }
                    })}
                  </ol>
                </fieldset>
              );
            })}
            <button
              type="submit"
              onClick={e => {
                e.preventDefault();
                survey.set(state).then(() => {});
                setState(s => ({
                  ...s,
                  formIsCompleted: true
                }));
              }}
            >
              Отправить
            </button>
          </form>
        </Container>
      )}
    </div>
  );
};
