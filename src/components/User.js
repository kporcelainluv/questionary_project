import React, { useContext, useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import styled from "styled-components";

import { MediaWidth } from "../consts";
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
  if (label === "Причина" && !value) {
    return true;
  }
  return (
    <div>
      <p>{label}:</p>
      <span>{value ? value : "Не указано"}</span>
    </div>
  );
};

const Block = ({ questions }) => {
  return (
    <ul>
      {questions.map(q => {
        return <Question value={q.value} label={q.label} />;
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

  console.log(state);

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
          <h3>Уход за кожей </h3>
          <Block
            questions={[
              { label: "Тип кожи", value: user.skincareType },
              { label: "До макияжа использует:", value: user.skincareProducts },
              {
                label: "Очищает кожу от макияжа:",
                value: user.skincareCleanser
              }
            ]}
          />

          <h3>Основа </h3>
          <Block
            questions={[
              { label: "Использует базу до макияжа:", value: user.base },
              { label: "Использует тональный крем:", value: user.foundation },
              { label: "Причина", value: user.foundationNotUsed },
              {
                label: "Предпочитаемая плотность тонального крема:",
                value: user.foundationPreference
              }
            ]}
          />

          <h3>Консилер</h3>
          <Block
            questions={[
              {
                label: "Использует консилер:",
                value: user.concealerUsage
              },
              {
                label: "Причина",
                value: user.concealerNotUsed
              }
            ]}
          />

          <h3>Пудра </h3>
          <Block
            questions={[
              {
                label: "Использует пудру:",
                value: user.powderUsage
              },
              {
                label: "Причина",
                value: user.powderNotUsed
              },
              {
                label: "Предпочитаемая пудра:",
                value: user.powderPreference
              }
            ]}
          />

          <h3>Румяна </h3>
          <Block
            questions={[
              {
                label: "Использует румяна:",
                value: user.blush
              },
              {
                label: "Причина",
                value: user.blushNotUsed
              },
              {
                label: "Предпочитаемые румяна:",
                value: user.blushPreference
              }
            ]}
          />

          <h3>Контуринг </h3>
          <Block
            questions={[
              {
                label: "Использует контуринг:",
                value: user.contour
              },
              {
                label: "Причина",
                value: user.contourNotUsed
              },
              {
                label: "Предпочитаемые продукты для контуринга:",
                value: user.contourPreference
              }
            ]}
          />

          <h3>Помада </h3>
          <Block
            questions={[
              {
                label: "Использует помады:",
                value: user.lipstick
              }
            ]}
          />

          <h2>Хайлайтер </h2>
          <Block
            questions={[
              {
                label: "Использует хайлайтер:",
                value: user.highlighterUsage
              },
              {
                label: "Причина",
                value: user.highlighterNotUsed
              },
              {
                label: "Предпочитает хайлайтеры:",
                value: user.highlighterPreference
              }
            ]}
          />

          <h3>Брови </h3>
          <Block
            questions={[
              {
                label: "Использует продукты для бровей:",
                value: user.browsPreference
              }
            ]}
          />

          <h3>Глаза </h3>
          <Block
            questions={[
              {
                label: "Использует продукты для глаз:",
                value: user.eyesPreference
              }
            ]}
          />

          <h3>Прочее </h3>
          <Block
            questions={[
              {
                label: "В косметичке уже есть:",
                value: user.userOwnedProducts
              },
              {
                label: "Как часто делает макияж:",
                value: user.frequency
              },
              {
                label: "От занятия ожидает:",
                value: user.expectations
              }
            ]}
          />
        </Fragment>
      )}
    </Container>
  );
};
