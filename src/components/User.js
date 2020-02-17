import React, { useContext, useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import styled from "styled-components";

import { MediaWidth } from "../consts";
import { Loader } from "./Loader";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";

const Container = styled.div`
  max-width: 350px;
  margin: 50px auto;
  color: #181919;
  line-height: 32px;
  font-family: "Montserrat", "PT Sans", sans-serif;
  @media ${MediaWidth.TABLET} {
    max-width: 600px;
  }
  h2 {
    text-align: center;
    margin: 50px auto 20px;
    max-width: 300px;
  }
  h3 {
    font-size: 16px;
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
    @media ${MediaWidth.TABLET} {
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
    @media ${MediaWidth.TABLET} {
      max-width: 350px;
    }
  }
`;

const Block = styled.div`
  color: #808080;
  font-size: 20px;
  max-width: 315px;
  padding-left: 16px;
  @media ${MediaWidth.TABLET} {
    max-width: 350px;
  }
`;

const handleUsage = status => {
  if (status === null) {
    return ` не указано`;
  } else if (status) {
    return `Да`;
  } else {
    return `Нет`;
  }
};

export const User = ({ id }) => {
  const [user, setUser] = useState([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    let user = undefined;
    const survey = firestore.doc(`survey-results/${id}`);
    survey.get().then(result => {
      if (result && result.exists) {
        user = result.data();
      }
      setUser(user);
    });

    document.title = "Страница пользователя";
  }, []);
  // TODO: fix Loading parameter error

  const { currentUser, isUserLoading } = useContext(AuthContext);

  if (!currentUser && !isUserLoading) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      {!user.date ? (
        <Loader />
      ) : (
        <Fragment>
          <h2>{user.name}</h2>
          <h3>Возвраст: {user.age || ` не указано`}</h3>
          <h2>Уход за кожей: </h2>
          <ul>
            <li>
              <p> Тип кожи:</p>
              <span>{user.skincareType || ` не указано`}</span>
            </li>
            <li>
              <p>До макияжа использует:</p>
              <span>{user.skincareProducts || ` не указано`}</span>
            </li>
            <li>
              <p>Очищает кожу от макияжа:</p>
              <span>{user.skincareCleanser || ` не указано`}</span>
            </li>
          </ul>
          <h2>Основа </h2>
          <ul>
            <li>
              <p>Использует базу до макияжа:</p>
              <span>{handleUsage(user.base)}</span>
            </li>
            <li>
              <p>Использует тональный крем:</p>
              <span>{handleUsage(user.foundation)}</span>
            </li>
            <li>
              {user.foundationNotUsed ? (
                <div>
                  <p>Причина:</p>
                  <span>{user.foundationNotUsed}</span>
                </div>
              ) : (
                ``
              )}
            </li>
            {user.foundationPreference ? (
              <li>
                <p>Предпочитаемая плотность тонального крема:</p>
                <span>{user.foundationPreference || ` не указано`}</span>
              </li>
            ) : (
              ``
            )}
          </ul>
          <h2>Консилер</h2>
          <ul>
            <li>
              <p> Использует консилер:</p>
              <span>{handleUsage(user.concealerUsage)}</span>
            </li>
            <li>
              {user.concealerNotUsed ? (
                <div>
                  <p>Причина:</p>
                  <span>{user.concealerNotUsed}</span>
                </div>
              ) : (
                ``
              )}
            </li>
          </ul>

          <h2>Пудра </h2>
          <ul>
            <li>
              <p>Использует пудру:</p>
              <span>{handleUsage(user.powderUsage)}</span>
            </li>
            <li>
              {user.powderNotUsed ? (
                <div>
                  <p>Причина:</p>
                  <span>{user.powderNotUsed}</span>
                </div>
              ) : (
                ``
              )}
            </li>

            {user.powderPreference ? (
              <li>
                <p>Предпочитаемая пудра:</p>
                <span>{user.powderPreference || ` не указано`}</span>
              </li>
            ) : (
              ``
            )}
          </ul>

          <h2>Румяна </h2>
          <ul>
            <li>
              <p> Использует румяна: </p>
              <span>{handleUsage(user.blush)}</span>
            </li>

            <li>
              {user.blushNotUsed ? (
                <div>
                  <p>Причина:</p>
                  <span>{user.blushNotUsed}</span>
                </div>
              ) : (
                ``
              )}
            </li>

            {user.blushPreference ? (
              <li>
                <p>Предпочитаемые румяна:</p>
                <span> {user.blushPreference || ` не указано`}</span>
              </li>
            ) : (
              ``
            )}
          </ul>

          <h2>Контуринг </h2>
          <ul>
            <li>
              <p> Использует контуринг: </p>
              <span>{handleUsage(user.contour)}</span>
            </li>

            <li>
              {user.contourNotUsed ? (
                <div>
                  <p>Причина:</p>
                  <span>{user.contourNotUsed}</span>
                </div>
              ) : (
                ``
              )}
            </li>

            {user.contourPreference ? (
              <li>
                <p>Предпочитаемые продукты для контуринга:</p>
                <span> {user.contourPreference || ` не указано`}</span>
              </li>
            ) : (
              ``
            )}
          </ul>

          <h2>Помада </h2>
          <ul>
            <li>
              <p>Использует помады:</p> <span>{user.lipstick}</span>
            </li>
          </ul>

          <h2>Хайлайтер </h2>
          <ul>
            <li>
              <p>Использует хайлайтер: </p>
              <span>{handleUsage(user.highlighterUsage)}</span>
            </li>

            <li>
              {user.highlighterNotUsed ? (
                <div>
                  <p>Причина:</p>
                  <span>{user.highlighterNotUsed}</span>
                </div>
              ) : (
                ``
              )}
            </li>

            {user.highlighterPreference ? (
              <li>
                <p> Предпочитает хайлайтеры:</p>
                <span>{user.highlighterPreference || ` не указано`}</span>
              </li>
            ) : (
              ``
            )}
          </ul>
          <h2>Брови </h2>
          <Block>
            <p>Использует продукты для бровей: </p>
            <span>{user.browsPreference || ` не указано`}</span>
          </Block>

          <h2>Глаза </h2>
          <Block>
            <p> Использует продукты для глаз:</p>
            <span> {user.eyesPreference || ` не указано`}</span>
          </Block>

          <h2>Прочее </h2>
          <Block>
            <p>В косметичке уже есть:</p>
            <span>{user.userOwnedProducts || ` не указано`}</span>
          </Block>
          <Block>
            <p>Как часто делает макияж </p>
            <span>{user.frequency || ` не указано`}</span>
          </Block>
          <Block>
            <p>От занятия ожидает </p>
            <span> {user.expectations || ` не указано`}</span>
          </Block>
        </Fragment>
      )}
    </Container>
  );
};
