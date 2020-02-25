import React, { useState } from "react";
import firebase from "firebase";
import nanoid from "nanoid";

import { Sections, QuestionResponse, QuestionType } from "../consts";
import { Text, Checkbox, Radio } from "./Questions";
import { FormCompletion } from "./FormCompletion";

const Section = ({
  name,
  questions,
  state,
  updateStateValue,
  updateCheckboxValue
}) => {
  return (
    <fieldset key={name}>
      <legend>{name}</legend>
      <ol>
        {questions.map(question => {
          const { name, type } = question;
          return (
            <li key={name + type} className="form_list-element">
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
};

const Question = ({
  question,
  state,
  updateStateValue,
  updateCheckboxValue
}) => {
  if (question.type === QuestionType.TEXT) {
    return (
      <Text
        key={question.name}
        question={question}
        updateStateValue={updateStateValue}
      />
    );
  } else if (question.type === QuestionType.RADIO) {
    return (
      <Radio
        key={question.name}
        question={question}
        updateStateValue={updateStateValue}
      />
    );
  } else if (question.type === QuestionType.CHECKBOX) {
    return (
      <Checkbox
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
    setState(s => {
      const prevValue = s[name] || [];

      return {
        ...s,
        [name]: [...prevValue, value]
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const survey = firebase.firestore().doc(`survey-results/${state.id}`);
    // TODO: add catch with state.error
    // TODO: add loading and button disabling
    survey.set(state).then(() =>
      setState(s => ({
        ...s,
        formIsCompleted: true
      }))
    );
  };

  return (
    <div>
      {state.formIsCompleted && <FormCompletion />}
      {!state.formIsCompleted && (
        <section>
          <h2 className="form_heading">Форма знакомства</h2>
          <p className="form_paragraph">
            Перед нашей встречей мне бы хотелось познакомиться с вами и вашей
            косметичкой. Тогда занятие произойдет наиболее плодотворно.
          </p>
          <form onSubmit={handleSubmit}>
            {Sections.map(section => {
              return (
                <Section
                  key={section.name}
                  name={section.name}
                  questions={section.questions}
                  state={state}
                  updateStateValue={updateStateValue}
                  updateCheckboxValue={updateCheckboxValue}
                />
              );
            })}
            <button className="button-long" type="submit">
              Отправить
            </button>
          </form>
        </section>
      )}
    </div>
  );
};
