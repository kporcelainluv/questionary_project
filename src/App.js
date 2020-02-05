import React from "react";
import { QuestionaryItem } from "./components/questionaryItem";
import { QuestionaryCheckbox } from "./components/questionaryCheckbox";
import { QuestionaryRadio } from "./components/questionaryRadio";
import { QuestionaryList } from "./consts";

export const App = () => {
  return (
    <div className={"container"}>
      <h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </h2>
      <form action="">
        {QuestionaryList.map(section => {
          return (
            <fieldset>
              <legend>{section.name}</legend>
              <ol>
                {section.questions.map(question => {
                  if (question.type === "text") {
                    return (
                      <li>
                        <QuestionaryItem
                          name={question.name}
                          question={question.question}
                        />
                      </li>
                    );
                  } else if (question.type === "radio") {
                    return (
                      <li>
                        <p> {question.question} </p>
                        {question.options.map((option, index) => {
                          if (option === "Добавить свой вариант") {
                            return (
                              <QuestionaryItem
                                name={"own-answer"}
                                question={option}
                              />
                            );
                          }
                          return (
                            <QuestionaryRadio
                              id={index}
                              name={question.name}
                              value={option}
                              text={option}
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
      </form>
    </div>
  );
};
