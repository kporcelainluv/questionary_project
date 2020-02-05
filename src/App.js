import React from "react";
import { QuestionaryList } from "./components/questionaryList";
import { QuestionaryItem } from "./components/questionaryItem";
import {
  FoundationQuestions,
  InfoQuestions,
  SkinQuestions,
  UtilQuestions
} from "./consts";

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
        <fieldset>
          <legend>Ваши данные:</legend>
          <ol>
            <QuestionaryItem id={"name"} heading={InfoQuestions.name} />
            {/*// или сделать в виде checkbox и сделать диапазон возрастов*/}
            <QuestionaryItem id={"age"} heading={InfoQuestions.age} />
          </ol>
        </fieldset>

        <fieldset>
          <legend>Кожа</legend>
          <ol>
            <QuestionaryItem id={"skinType"} heading={SkinQuestions.skinType} />
            <QuestionaryItem id={"skinCare"} heading={SkinQuestions.skinCare} />
            <QuestionaryItem
              id={"skinCleanser"}
              heading={SkinQuestions.skinCleanser}
            />

            <QuestionaryItem
              id={"skinFeedback"}
              heading={UtilQuestions.comment}
            />
          </ol>
        </fieldset>

        <fieldset>
          <legend>Тональное средство: </legend>
          <ol>
            <QuestionaryItem
              id={"foundationBase"}
              heading={FoundationQuestions.base}
            />
            <QuestionaryItem id={"skinCare"} heading={SkinQuestions.skinCare} />
            <QuestionaryItem
              id={"skinCleanser"}
              heading={SkinQuestions.skinCleanser}
            />

            <QuestionaryItem
              id={"skinFeedback"}
              heading={UtilQuestions.comment}
            />
          </ol>
        </fieldset>
      </form>
    </div>
  );
};
