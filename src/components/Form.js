import React from "react";
import { QuestionaryList, MediaWidth } from "../consts";
import { QuestionaryItem } from "./questionary-components/questionaryItem";
import { QuestionaryRadio } from "./questionary-components/questionaryRadio";
import { QuestionaryCheckbox } from "./questionary-components/questionaryCheckbox";
import { FormCompletion } from "./formCompletion";
import styled from "styled-components";
import firebase from "firebase";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: #181919;
  @media ${MediaWidth.MOBILE} {
    max-width: 350px;
    margin: auto;
  }
  @media ${MediaWidth.TABLET} {
    max-width: 650px;
    margin: auto;
  }
`;

const Heading = styled.h2`
  display: flex;
  margin-top: 40px;
  padding: 10px;
  justify-content: center;
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
`;

const Subheading = styled.p`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 10px;
  line-height: 25px;
  text-align: center;
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  max-width: 310px;
  @media ${MediaWidth.TABLET} {
    max-width: 650px;
    margin: auto;
  }
`;

const FormSubmit = styled.input`
  background-color: #181919;
  height: 50px;
  display: flex;
  margin: 20px auto 50px;
  justify-content: center;
  color: white;
  border-radius: 25px;
  border: 3px solid white;
  width: 300px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  @media ${MediaWidth.TABLET} {
    width: 567px;
    height: 55px;
  }
`;
const FieldsetLegend = styled.legend`
  color: #181919;
  font-weight: 600;
  font-family: "Montserrat", "PT Sans", sans-serif;
  margin: 20px auto;
  font-size: 18px;
  text-align: center;
`;
const List = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 25px;
  position: relative;
`;

const QuestionWrap = styled.span`
  padding-left: 20px;
  font-size: 16px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  margin-bottom: 10px;
`;

export class Form extends React.Component {
  state = {
    id: this.props.id,
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
      <div>
        {this.state.formIsCompleted && <FormCompletion />}
        {!this.state.formIsCompleted && (
          <Container>
            <Heading>Форма знакомства</Heading>
            <Subheading>
              Перед нашей встречей мне бы хотелось познакомиться с вами и вашей
              косметичкой. Тогда занятие произойдет наиболее плодотворно.
            </Subheading>
            <form action="">
              {QuestionaryList.map(section => {
                return (
                  <fieldset
                    key={section.name}
                    style={{ border: "none", marginBottom: "20px" }}
                  >
                    <FieldsetLegend>{section.name}</FieldsetLegend>
                    <ol style={{ paddingLeft: 0 }}>
                      {/* eslint-disable-next-line array-callback-return */}
                      {section.questions.map((question, index) => {
                        if (question.type === "test") {
                          if (this.state[question.name] === null) {
                            return null;
                          } else if (this.state[question.name] === true) {
                            question = question.yes;
                          } else if (this.state[question.name] === false) {
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
                              <QuestionWrap> {question.question} </QuestionWrap>
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
                              <QuestionWrap> {question.question} </QuestionWrap>
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
                  docRef.set(this.state).then(() => {});
                  this.setState({ formIsCompleted: true });
                }}
              />
            </form>
          </Container>
        )}
      </div>
    );
  }
}
