import React, { useContext, useEffect, useState, Fragment } from "react";
import firebase from "firebase";

import { UserProfile } from "../consts";
import { Loader } from "./Loader";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router";
import { Error } from "./Error";

const Block = ({ questions }) => {
  return (
    <ul className="user_list">
      {questions.map(question => {
        const { heading, value } = question;
        if (!value) {
          return true;
        }
        return (
          <li key={value}>
            <p className="user_paragraph">{heading}:</p>
            <span className="user_subparagraph">
              {typeof value === "object" ? value.join(", ") : value}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export const User = ({ id }) => {
  const [state, setState] = useState({
    survey: undefined,
    isLoading: true,
    error: false
  });

  useEffect(() => {
    firebase
      .firestore()
      .doc(`survey-results/${id}`)
      .get()
      .then(result => {
        if (result && result.exists) {
          setState(s => ({
            ...s,
            survey: result.data(),
            isLoading: false
          }));
        }
      })
      .catch(() => setState(s => ({ ...s, error: true })));

    document.title = "Страница пользователя";
  }, []);

  const { currentUser, isUserLoading } = useContext(AuthContext);

  if (!currentUser && !isUserLoading) {
    return <Redirect to="/login" />;
  }

  const user = state.survey;

  if (state.error) {
    return (
      <section>
        <Error />
      </section>
    );
  }

  return (
    <section>
      {state.isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="user_heading">{user.name}</h1>
          {user.age && (
            <h2 className="user_subheading">Возвраст: {user.age}</h2>
          )}
          {UserProfile.map((res, index) => {
            return (
              <div key={res.name + index}>
                <h3 style={{ textAlign: "center" }}>{res.name}</h3>
                <Block
                  questions={res.questions.map(q => {
                    return { heading: q.heading, value: user[q.name] };
                  })}
                />
              </div>
            );
          })}
        </Fragment>
      )}
    </section>
  );
};
