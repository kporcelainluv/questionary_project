import React from "react";
import { QuestionaryList } from "../consts";
import { QuestionaryItem } from "./questionary-components/questionaryItem";
import { QuestionaryRadio } from "./questionary-components/questionaryRadio";
import { QuestionaryCheckbox } from "./questionary-components/questionaryCheckbox";
import styled from "styled-components";
import firebase from "firebase";

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  font-family: Arial, serif;
`;

const Container = styled.section`
  max-width: 600px;
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

export class Form extends React.Component {
  state = {
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
    expectations: null
  };

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
    const id = this.props.id;
    const firestore = firebase.firestore();
    const docRef = firestore.doc(`survey-results/${id}`);

    return (
      <Container>
        <Heading>
          Добрый день! Перед нашей встречей мне бы хотелось познакомиться с вами
          и вашей косметичкой, чтобы занятие произошло наиболее плодотворно.
          Заполните, пожалуйста, данную форму.
        </Heading>
        <form action="">
          {QuestionaryList.map(section => {
            return (
              <fieldset key={section.name}>
                <legend>{section.name}</legend>
                <ol>
                  {/* eslint-disable-next-line array-callback-return */}
                  {section.questions.map((question, index) => {
                    if (question.type === "test") {
                      if (!this.state[question.name]) {
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
          <FormSubmit
            type="submit"
            value="Отправить"
            className="on-form-submit"
            onClick={e => {
              e.preventDefault();
              docRef.set(this.state).then(() => {
                console.log("Succeess");
              });
            }}
          />
        </form>
      </Container>
    );
  }
}
