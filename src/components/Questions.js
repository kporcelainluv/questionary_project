import React from "react";

export const Text = ({ question, updateStateValue }) => {
  const { name } = question;
  return (
    <label htmlFor={name} className="text-label">
      <span className="text-heading">{question.question}</span>
      <textarea
        name={name}
        onChange={e => updateStateValue(name, e.target.value)}
      />
    </label>
  );
};

export const Radio = ({ question, updateStateValue }) => {
  return (
    <div className="question-block">
      <span> {question.question} </span>
      {question.options.map((option, index) => {
        const { name } = question;
        const key = name + index;
        const id = name + index;

        return (
          <label key={key} htmlFor={id} className="input-label">
            <input
              className="input-choice"
              type="radio"
              id={id}
              name={name}
              value={option}
              onChange={() => updateStateValue(name, option)}
            />
            <span className="input-heading">{option}</span>
          </label>
        );
      })}
    </div>
  );
};

export const Checkbox = ({ question, updateCheckboxValue }) => {
  return (
    <div className="question-block">
      <span> {question.question} </span>
      {question.options.map((option, index) => {
        const { name } = question;
        const key = name + index;
        const id = name + index;

        return (
          <label className="input-label" key={key} htmlFor={id}>
            <input
              className="input-choice"
              type="checkbox"
              id={id}
              name={name}
              onChange={() => {
                updateCheckboxValue(name, option);
              }}
            />
            <span className="input-heading">{option}</span>
          </label>
        );
      })}
    </div>
  );
};
