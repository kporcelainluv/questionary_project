import React from "react";
import { QuestionaryItem } from "./components/questionaryItem";
import { QuestionaryCheckbox } from "./components/questionaryCheckbox";
import { QuestionaryRadio } from "./components/questionaryRadio";
import { QuestionaryList } from "./consts";
import styled from "styled-components";

const Container = styled.section`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const FormSubmit = styled.input`
  background-color: black;
  height: 50px;
  width: 200px;
  color: white;
  margin: auto;
  display: flex;
  margin-top: 20px;
  margin-bottom: 50px;
  justify-content: center;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

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
    return (
      <Container>
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
                        <List key={question.name}>
                          <QuestionaryItem
                            key={`${question.name}-${index}`}
                            name={question.name}
                            question={question.question}
                          />
                        </List>
                      );
                    } else if (question.type === "radio") {
                      return (
                        <List key={question.name}>
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
                        </List>
                      );
                    } else if (question.type === "checkbox") {
                      return (
                        <List key={question.name}>
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
                        </List>
                      );
                    }
                  })}
                </ol>
              </fieldset>
            );
          })}
          <FormSubmit type="submit" value="Отправить" />
        </form>
      </Container>
    );
  }
}
