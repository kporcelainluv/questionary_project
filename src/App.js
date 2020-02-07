import React from "react";
import { QuestionaryItem } from "./components/questionaryItem";
import { QuestionaryCheckbox } from "./components/questionaryCheckbox";
import { QuestionaryRadio } from "./components/questionaryRadio";
import { QuestionaryList } from "./consts";
import styled from "styled-components";

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  font-family: Arial, serif;
`;
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
  display: flex;
  margin: 20px auto 50px;
  justify-content: center;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export class App extends React.Component {
  state = {};

  handleRadioButtonChoice = (name, value) => {
    if (value === "Да") {
      this.setState({ [name]: true });
    } else if (value === "Нет") {
      this.setState({ [name]: false });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleCheckboxChoice = (name, value) => {
    if (this.state[name]) {
      const list = this.state[name].concat(" " + value);
      this.setState({ [name]: list });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleTextareaChoice = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    console.log({ state: this.state });
    return (
      <Container>
        <Heading>
          Добрый день! Перед нашей встречей мне бы хотелось познакомиться с вами
          и вашей косметичкой, чтобы занятие произошло наиболее плодотворно.
          Заполните, пожалуйста, данную форму.
        </Heading>
        <form action="" method={"http://localhost:3000/"}>
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
                            handleOnClick={this.handleTextareaChoice}
                          />
                        </List>
                      );
                    } else if (question.type === "radio") {
                      return (
                        <List key={question.name}>
                          <p> {question.question} </p>
                          {question.options.map((option, index) => {
                            return (
                              <QuestionaryRadio
                                key={`${question.name}${index}`}
                                id={`${question.name}${index}`}
                                name={question.name}
                                value={option}
                                handleOnClick={this.handleRadioButtonChoice}
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
                            return (
                              <QuestionaryCheckbox
                                key={`${question.name}-${index}`}
                                id={`${option}-${index}`}
                                heading={option}
                                name={question.name}
                                handleOnClick={this.handleCheckboxChoice}
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
