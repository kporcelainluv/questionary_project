import React, { useState } from "react";
import firebase from "firebase";
import nanoid from "nanoid";

import { Sections, QuestionResponse, QuestionType } from "../consts";
import { Text, Checkbox, Radio } from "./Questions";
import { FormCompletion } from "./FormCompletion";
import { Error } from "./Error";
import { Loader } from "./Loader";

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
    state[question.name] === QuestionResponse.TRUE &&
    question.true
  ) {
    return question.true.map(elm => {
      return (
        <Question
          key={elm.name}
          question={elm}
          state={state}
          updateCheckboxValue={updateCheckboxValue}
          updateStateValue={updateStateValue}
        />
      );
    });
  } else if (
    question.type === QuestionType.TEST &&
    state[question.name] === QuestionResponse.FALSE &&
    question.false
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
    submitted: false,
    submitting: false,
    submitError: null
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
    setState(s => ({ ...s, submitting: true }));
    const survey = firebase.firestore().doc(`survey-results/${state.id}`);
    survey
      .set(state)
      .then(() =>
        setState(s => ({
          ...s,
          submitted: true
        }))
      )
      .catch(() => setState(s => ({ ...s, submitError: true })));
  };
  if (state.submitError) {
    return (
      <section>
        <Error />
      </section>
    );
  }

  return (
    <div>
      {state.submitted && <FormCompletion />}
      {!state.submitted && (
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

            {state.submitting && <Loader size={" small"} />}
            <button
              className="button-long"
              type="submit"
              disabled={state.submitting}
            >
              Отправить
            </button>
          </form>
        </section>
      )}
    </div>
  );
};
