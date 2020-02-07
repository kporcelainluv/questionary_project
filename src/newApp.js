import React from "react";
import { QuestionaryItem } from "./components/questionaryItem";
import { QuestionaryCheckbox } from "./components/questionaryCheckbox";
import { QuestionaryRadio } from "./components/questionaryRadio";
import { QuestionaryList, InfoName, InfoAge } from "./consts";
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

export class NewApp extends React.Component {
  state = {};

  render() {
    return (
      <Container>
        <Heading>
          Добрый день! Перед нашей встречей мне бы хотелось познакомиться с вами
          и вашей косметичкой, чтобы занятие произошло наиболее плодотворно.
          Заполните, пожалуйста, данную форму.
        </Heading>
        <form action="">
          <fieldset>
            <legend>{QuestionaryList.intro.name}</legend>
            <QuestionaryItem
              name={InfoName.name}
              question={InfoName.question}
            />
            <List key={question.name}>
              <p> {question.question} </p>
              {question.options.map((option, index) => {
                if (option === "Добавить свой вариант") {
                  if (this.state[`${question.name}-personal`]) {
                    return (
                      <QuestionaryItem
                        key={`${question.name}-personal`}
                        name={`${question.name}-personal`}
                        question={option}
                        handleOnClick={this.handleTextareaChoice}
                      />
                    );
                  }
                }
                return (
                  <QuestionaryRadio
                    key={`${question.name}-${index}`}
                    id={`${question.name}-${index}`}
                    name={question.name}
                    value={option}
                    text={option}
                    handleOnClick={this.handleRadioButtonChoice}
                  />
                );
              })}
            </List>
            ;
          </fieldset>
        </form>
      </Container>
    );
  }
}
