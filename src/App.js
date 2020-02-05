import React from "react";
import { QuestionaryItem } from "./components/questionaryItem";
import { QuestionaryCheckbox } from "./components/questionaryCheckbox";
import { QuestionaryRadio } from "./components/questionaryRadio";
import { QuestionaryList } from "./consts";

export class App extends React.Component {
  state = {};

  handleOnClick = (name, value) => {
    if (value === "Да") {
      this.setState({ [name]: true });
    } else {
      this.setState({ [name]: false });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className={"container"}>
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h2>
        <form action="">
          {QuestionaryList.map(section => {
            return (
              <fieldset key={section.name}>
                <legend>{section.name}</legend>
                <ol>
                  {/* eslint-disable-next-line array-callback-return */}
                  {section.questions.map((question, index) => {
                    if (question.type === "test") {
                      if (this.state[question.name] === undefined) {
                        return null;
                      }
                      if (this.state[question.name] === true) {
                        question = question.yes;
                      } else {
                        question = question.no;
                      }
                    }
                    if (question.type === "text") {
                      return (
                        <li key={question.name}>
                          <QuestionaryItem
                            key={`${question.name}-${index}`}
                            name={question.name}
                            question={question.question}
                          />
                        </li>
                      );
                    } else if (question.type === "radio") {
                      return (
                        <li key={question.name}>
                          <p> {question.question} </p>
                          {question.options.map((option, index) => {
                            if (option === "Добавить свой вариант") {
                              const ownId = `${option}-own-answer`;
                              return (
                                <QuestionaryItem
                                  key={`${question.name}-${index}`}
                                  name={ownId}
                                  question={option}
                                />
                              );
                            }
                            return (
                              <QuestionaryRadio
                                key={`${question.name}-${index}`}
                                id={`${question.name}-${index}`}
                                name={question.name}
                                value={option}
                                text={option}
                                handleOnClick={this.handleOnClick}
                              />
                            );
                          })}
                        </li>
                      );
                    } else if (question.type === "checkbox") {
                      return (
                        <li key={question.name}>
                          <p> {question.question} </p>
                          {question.options.map((option, index) => {
                            if (option === "Добавить свой вариант") {
                              const ownId = `${question.name}-${index}-own`;
                              return (
                                <QuestionaryItem
                                  key={`${question.name}-${index}`}
                                  name={ownId}
                                  question={option}
                                />
                              );
                            }
                            return (
                              <QuestionaryCheckbox
                                key={`${question.name}-${index}`}
                                id={`${option}-index`}
                                heading={option}
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
          <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}
