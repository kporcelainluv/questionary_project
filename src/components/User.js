import React, { useContext, useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import styled from "styled-components";

import { MediaWidth, Result } from "../consts";
import { Loader } from "./Loader";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";
import { Error } from "./Error";

const Container = styled.div`
  max-width: 350px;
  margin: 50px auto;
  color: #181919;
  line-height: 32px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  @media (min-width: ${MediaWidth.TABLET}) {
    max-width: 600px;
  }
  h1 {
    text-align: center;
    margin: 50px auto 20px;
    max-width: 300px;
  }
  h2 {
    font-size: 16px;
    text-align: center;
  }
  h3 {
    text-align: center;
  }
  ul {
    padding-left: 10px;
  }
  li {
    color: #808080;
    font-size: 20px;
    list-style-type: none;
    max-width: 315px;
    padding-left: 16px;
    margin-bottom: 10px;
    @media (min-width: ${MediaWidth.TABLET}) {
      max-width: 350px;
    }
  }
  span {
    font-size: 20px;
    color: #181919;
  }
  p {
    color: #808080;
    font-size: 20px;
    list-style-type: none;
    max-width: 315px;
    margin: 0;
    padding: 0;
    @media (min-width: ${MediaWidth.TABLET}) {
      max-width: 350px;
    }
  }
`;

const Question = ({ label, value }) => {
  if (!value) {
    return true;
  }
  return (
    <div>
      <p>{label}:</p>
      <span>{typeof value === "object" ? value.join(", ") : value}</span>
    </div>
  );
};

const Block = ({ questions }) => {
  return (
    <ul>
      {questions.map(q => {
        return <Question value={q.value} label={q.label} key={q.label} />;
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
      <Container>
        <Error />
      </Container>
    );
  }

  return (
    <Container>
      {state.isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1>{user.name}</h1>
          {user.age && <h2>Возвраст: {user.age}</h2>}
          {Result.map((res, index) => {
            return (
              <div key={index}>
                <h3>{res.name}</h3>
                <Block
                  key={index}
                  questions={res.questions.map(q => {
                    return { label: q.label, value: user[q.name] };
                  })}
                />
              </div>
            );
          })}
        </Fragment>
      )}
    </Container>
  );
};
