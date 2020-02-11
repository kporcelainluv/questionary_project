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
const Paragraph = styled.p`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  font-size: 18px;
  margin: auto;
  padding-left: 40px;
  line-height: 25px;
  max-width: 300px;
`;
const ListElement = styled.li`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  font-size: 18px;
  margin: auto;
  list-style-type: none;
  max-width: 300px;
  padding: 10px 0;
  line-height: 25px;
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
        console.log({ myData });
      }
      setDocs(myData);
    });
  }, []);
  console.log({ docs });
  return (
    <Container>
      <Heading>{docs.name}</Heading>
      <SubHeading>Возвраст: {docs.age || ` не указано`}</SubHeading>
      <Heading>Уход за кожей: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Тип кожи: {docs.skincareType || ` не указано`}
        </ListElement>
        <ListElement>
          До макияжа использует: {docs.skincareProducts || ` не указано`}
        </ListElement>
        <ListElement>
          Очищает кожу от макияжа: {docs.skincareCleanser || ` не указано`}
        </ListElement>
      </ul>
      <Heading>Основа: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Использует базу до макияжа: {handleUserUsage(docs.base)}
        </ListElement>
        <ListElement>
          Использует тональный крем: {handleUserUsage(docs.foundation)}
          {docs.foundationNotUsed ? (
            <span>потому что: {docs.foundationNotUsed}</span>
          ) : (
            ``
          )}
        </ListElement>
        {docs.foundationPreference ? (
          <ListElement>
            Предпочитаемая плотность тонального крема:
            {docs.foundationPreference || ` не указано`}
          </ListElement>
        ) : (
          ``
        )}
      </ul>
      <Heading>Консилер: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Использует консилер: {handleUserUsage(docs.concealerUsage)}
          {docs.concealerNotUsed ? (
            <span>потому что: {docs.concealerNotUsed}</span>
          ) : (
            ``
          )}
        </ListElement>
      </ul>

      <Heading>Пудра: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Использует пудру: {handleUserUsage(docs.powderUsage)}
        </ListElement>

        {docs.powderNotUsed ? (
          <ListElement>Причина: {docs.powderNotUsed}</ListElement>
        ) : (
          ``
        )}

        {docs.powderPreference ? (
          <ListElement>
            Предпочитаемая пудра:
            {docs.powderPreference || ` не указано`}
          </ListElement>
        ) : (
          ``
        )}
      </ul>

      <Heading>Румяна: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Использует румяна: {handleUserUsage(docs.blush)}
        </ListElement>

        {docs.blushNotUsed ? (
          <ListElement>причина: {docs.blushNotUsed}</ListElement>
        ) : (
          ``
        )}

        {docs.blushPreference ? (
          <ListElement>
            Предпочитаемые румяна:
            {docs.blushPreference || ` не указано`}
          </ListElement>
        ) : (
          ``
        )}
      </ul>

      <Heading>Контуринг: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Использует контуринг: {handleUserUsage(docs.contour)}
        </ListElement>

        {docs.contourNotUsed ? (
          <ListElement>Причина: {docs.contourNotUsed}</ListElement>
        ) : (
          ``
        )}
        {docs.contourPreference ? (
          <ListElement>
            Предпочитаемые продукты для контуринга:
            {docs.contourPreference || ` не указано`}
          </ListElement>
        ) : (
          ``
        )}
      </ul>

      <Heading>Помада: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>Использует помады: {docs.lipstick}</ListElement>
      </ul>

      <Heading>Хайлайтер: </Heading>
      <ul style={{ paddingLeft: "30px" }}>
        <ListElement>
          Использует хайлайтер: {handleUserUsage(docs.highlighterUsage)}
        </ListElement>
        {docs.highlighterNotUsed ? (
          <ListElement>Причина: {docs.highlighterNotUsed}</ListElement>
        ) : (
          ``
        )}

        {docs.highlighterPreference ? (
          <ListElement>
            Предпочитает хайлайтеры:{" "}
            {docs.highlighterPreference || ` не указано`}{" "}
          </ListElement>
        ) : (
          ``
        )}
      </ul>
      <Heading>Брови: </Heading>
      <Paragraph>
        Использует продукты для бровей: {docs.browsPreference || ` не указано`}
      </Paragraph>

      <Heading>Глаза: </Heading>
      <Paragraph>
        Использует продукты для глаз: {docs.eyesPreference || ` не указано`}
      </Paragraph>

      <Heading>Сегмент косметики: </Heading>
      <Paragraph>
        В косметичке уже есть: {docs.userOwnedProducts || ` не указано`}
      </Paragraph>

      <Heading>Как часто делает макияж: </Heading>
      <Paragraph>{docs.frequency || ` не указано`}</Paragraph>

      <Heading>От занятия ожидает: </Heading>
      <Paragraph> {docs.expectations || ` не указано`}</Paragraph>
    </Container>
  );
};
