import React from "react";
import { QuestionaryList } from "../consts";
import { QuestionaryItem } from "./questionary-components/questionaryItem";
import { QuestionaryRadio } from "./questionary-components/questionaryRadio";
import { QuestionaryCheckbox } from "./questionary-components/questionaryCheckbox";
import styled from "styled-components";
import firebase from "firebase";
import nanoid from "nanoid";

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

export class Form extends React.Component {
  state = {
    name: "",
    age: "",
    skincareType: "",
    skincareProducts: "",
    skincareCleanser: "",
    base: "",
    foundation: "",
    foundationPreference: "",
    foundationNotUsed: "",
    concealerUsage: "",
    concealerNotUsed: "",
    powderUsage: "",
    powderNotUsed: "",
    powderPreference: "",
    blush: "",
    blushNotUsed: "",
    blushPreference: "",
    contour: "",
    contourNotUsed: "",
    contourPreference: "",
    lipstick: "",
    highlighterUsage: "",
    highlighterNotUsed: "",
    highlighterPreference: "",
    browsPreference: "",
    eyesPreference: "",
    toolsPreference: "",
    userOwnedProducts: "",
    frequency: "",
    expectations: ""
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
    console.log({ state: this.state });

    console.log({
      pathname: window.location.pathname
    });

    firebase.initializeApp({
      apiKey: "AIzaSyCUGPGe5R6dTPJIXKFVDJ--QnwLvvA49zY",
      authDomain: "questionary-8ec9b.firebaseapp.com",
      databaseURL: "https://questionary-8ec9b.firebaseio.com",
      projectId: "questionary-8ec9b",
      storageBucket: "questionary-8ec9b.appspot.com",
      messagingSenderId: "1007269819903",
      appId: "1:1007269819903:web:e25fe2c1e9e395176ae3ca",
      measurementId: "G-58ZEK8SJ7P"
    });
    const id = nanoid();
    const firestore = firebase.firestore();
    const docRef = firestore.doc(`survey-results/${id}`);

    console.log({ docRef });
    docRef.get().then(doc => {
      if (doc && doc.exists) {
        console.log(doc.data());
      }
    });

    console.log({ id });

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
          <FormSubmit
            type="submit"
            value="Отправить"
            className="on-form-submit"
            onClick={e => {
              e.preventDefault();
              console.log(this.state);
              console.log("I'm going to save this to firestore");
              docRef
                .set(this.state)
                .then(res => {
                  console.log("Success!");
                  docRef.get().then(doc => {
                    if (doc && doc.exists) {
                      const myData = doc.data();
                      console.log(myData);
                    }
                  });
                })
                .catch(e => {
                  console.log("Got an error", e);
                });
            }}
          />
        </form>
      </Container>
    );
  }
}
