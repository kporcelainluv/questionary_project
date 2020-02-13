import React, { useEffect, useState } from "react";
import firebase from "firebase";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  color: #181919;
`;
const Heading = styled.h2`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  font-weight: 500;
  text-align: center;
  margin: 50px auto 20px;
  max-width: 300px;
`;

const SubHeading = styled.h3`
  font-family: "Montserrat", "PT Sans", sans-serif;
  font-size: 16px;
  color: #181919;
  font-weight: 500;
  text-align: center;
`;
const Block = styled.div`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #808080;
  font-size: 20px;
  list-style-type: none;
  max-width: 315px;
  line-height: 32px;
  padding-left: 16px;
`;

const P2 = styled.p`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  font-size: 20px;
  list-style-type: none;
  max-width: 315px;
  line-height: 32px;
  padding-left: 16px;
`;
const P3 = styled.p`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #808080;
  font-size: 20px;
  list-style-type: none;
  max-width: 315px;
  line-height: 32px;
  margin: 0;
  padding: 0;
`;
const ListElement = styled.li`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #808080;
  font-size: 20px;
  list-style-type: none;
  max-width: 315px;
  line-height: 32px;
  padding-left: 16px;
  margin-bottom: 10px;
`;
const Value = styled.span`
  font-size: 20px;
  color: #181919;
`;

const UL = styled.ul`
  padding-left: 10px;
`;

const handleUserUsage = status => {
  if (status === null) {
    return ` не указано`;
  } else if (status) {
    return `Да`;
  } else {
    return `Нет`;
  }
};

const prettifyUserResponse = response => {
  console.log({ response });
  const splittedResponse = response.split(" ");
  splittedResponse.reduce((acc, elm, index) => {
    if (index === splittedResponse.length - 1) {
      acc += `${elm}`;
    } else {
      acc += `${elm}, `;
    }
    return acc;
  }, ``);
};

export const User = ({ id }) => {
  const [docs, setDocs] = useState([]);
  const firestore = firebase.firestore();

  useEffect(() => {
    let myData = undefined;
    const docRef = firestore.doc(`survey-results/${id}`);
    docRef.get().then(doc => {
      if (doc && doc.exists) {
        myData = doc.data();
      }
      setDocs(myData);
    });
  }, []);
  return (
    <Container>
      <Heading>{docs.name}</Heading>
      <SubHeading>Возвраст: {docs.age || ` не указано`}</SubHeading>
      <Heading>Уход за кожей: </Heading>
      <UL>
        <ListElement>
          <P3> Тип кожи:</P3>
          <Value>{docs.skincareType || ` не указано`}</Value>
        </ListElement>
        <ListElement>
          <P3>До макияжа использует:</P3>
          <Value>{docs.skincareProducts || ` не указано`}</Value>
        </ListElement>
        <ListElement>
          <P3>Очищает кожу от макияжа:</P3>
          <Value>{docs.skincareCleanser || ` не указано`}</Value>
        </ListElement>
      </UL>
      <Heading>Основа </Heading>
      <UL>
        <ListElement>
          <P3>Использует базу до макияжа:</P3>
          <Value>{handleUserUsage(docs.base)}</Value>
        </ListElement>
        <ListElement>
          <P3>Использует тональный крем:</P3>
          <Value>{handleUserUsage(docs.foundation)}</Value>
          {docs.foundationNotUsed ? (
            <P3>
              Причина: <Value>{docs.foundationNotUsed}</Value>
            </P3>
          ) : (
            ``
          )}
        </ListElement>
        {docs.foundationPreference ? (
          <ListElement>
            <P3>Предпочитаемая плотность тонального крема:</P3>
            <Value>{docs.foundationPreference || ` не указано`}</Value>
          </ListElement>
        ) : (
          ``
        )}
      </UL>
      <Heading>Консилер</Heading>
      <UL>
        <ListElement>
          <P3> Использует консилер:</P3>
          <Value>{handleUserUsage(docs.concealerUsage)}</Value>
          {docs.concealerNotUsed ? (
            <P3>
              Причина: <Value>{docs.concealerNotUsed}</Value>
            </P3>
          ) : (
            ``
          )}
        </ListElement>
      </UL>

      <Heading>Пудра </Heading>
      <UL>
        <ListElement>
          <P3>Использует пудру:</P3>
          <Value>{handleUserUsage(docs.powderUsage)}</Value>
        </ListElement>

        {docs.powderNotUsed ? (
          <ListElement>
            <P3>Причина:</P3> <Value>{docs.powderNotUsed}</Value>
          </ListElement>
        ) : (
          ``
        )}

        {docs.powderPreference ? (
          <ListElement>
            <P3>Предпочитаемая пудра:</P3>
            <Value>{docs.powderPreference || ` не указано`}</Value>
          </ListElement>
        ) : (
          ``
        )}
      </UL>

      <Heading>Румяна </Heading>
      <UL>
        <ListElement>
          <P3> Использует румяна: </P3>
          <Value>{handleUserUsage(docs.blush)}</Value>
        </ListElement>

        {docs.blushNotUsed ? (
          <ListElement>
            <P3>Причина:</P3> <Value>{docs.blushNotUsed}</Value>
          </ListElement>
        ) : (
          ``
        )}

        {docs.blushPreference ? (
          <ListElement>
            <P3>Предпочитаемые румяна:</P3>
            <Value> {docs.blushPreference || ` не указано`}</Value>
          </ListElement>
        ) : (
          ``
        )}
      </UL>

      <Heading>Контуринг </Heading>
      <UL>
        <ListElement>
          <P3> Использует контуринг: </P3>
          <Value>{handleUserUsage(docs.contour)}</Value>
        </ListElement>

        {docs.contourNotUsed ? (
          <ListElement>
            <P3>Причина:</P3> <Value>{docs.contourNotUsed}</Value>
          </ListElement>
        ) : (
          ``
        )}
        {docs.contourPreference ? (
          <ListElement>
            <P3>Предпочитаемые продукты для контуринга:</P3>
            <Value> {docs.contourPreference || ` не указано`}</Value>
          </ListElement>
        ) : (
          ``
        )}
      </UL>

      <Heading>Помада </Heading>
      <UL>
        <ListElement>
          <P3>Использует помады:</P3> <Value>{docs.lipstick}</Value>
        </ListElement>
      </UL>

      <Heading>Хайлайтер </Heading>
      <UL>
        <ListElement>
          <P3>Использует хайлайтер: </P3>
          <Value>{handleUserUsage(docs.highlighterUsage)}</Value>
        </ListElement>
        {docs.highlighterNotUsed ? (
          <ListElement>
            <P3> Причина:</P3> <Value>{docs.highlighterNotUsed}</Value>
          </ListElement>
        ) : (
          ``
        )}

        {docs.highlighterPreference ? (
          <ListElement>
            <P3> Предпочитает хайлайтеры</P3>
            <Value>{docs.highlighterPreference || ` не указано`}</Value>
          </ListElement>
        ) : (
          ``
        )}
      </UL>
      <Heading>Брови </Heading>
      <Block>
        <P3>Использует продукты для бровей </P3>
        <Value>{docs.browsPreference || ` не указано`}</Value>
      </Block>

      <Heading>Глаза </Heading>
      <Block>
        <P3> Использует продукты для глаз</P3>
        <Value> {docs.eyesPreference || ` не указано`}</Value>
      </Block>

      <Heading>Сегмент косметики </Heading>
      <Block>
        <P3>В косметичке уже есть:</P3>
        <Value>{docs.userOwnedProducts || ` не указано`}</Value>
      </Block>

      <Heading>Как часто делает макияж </Heading>
      <P2>{docs.frequency || ` не указано`}</P2>

      <Heading>От занятия ожидает </Heading>
      <P2> {docs.expectations || ` не указано`}</P2>
    </Container>
  );
};
