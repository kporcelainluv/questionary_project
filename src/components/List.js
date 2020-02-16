import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import ru from "date-fns/locale/ru";
import styled from "styled-components";

import { AuthContext } from "../Auth";

// TODO use timeago
// TODO it's not getCurrentDate
// console.log(userData);
// console.log(fromUnixTime(userData.date.seconds));
// https://date-fns.org/v2.0.0-alpha.25/docs/formatDistance
const getCurrentDate = timestamp => {
  console.log(timestamp);
  return format(new Date(timestamp["seconds"] * 1000), "d LLL yyyy k:MM", {
    locale: ru
  });
};

const getLinktoUserProfile = id => {
  return `${window.location.origin}/${id}`;
};

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  color: #181919;
  font-family: "Montserrat", "PT Sans", sans-serif;
  h2 {
    font-weight: 500;
    text-align: center;
  }
  button {
    background-color: #181919;
    cursor: pointer;
    width: 300px;
    height: 50px;
    display: flex;
    margin: 20px auto 50px;
    justify-content: center;
    color: white;
    font-size: 18px;
    border-radius: 25px;
    border: 3px solid white;
    &:hover {
      background-color: #454747;
    }
  }
`;

const Table = styled.table`
  display: table;
  margin: auto;

  tbody {
    text-align: left;
    line-height: 30px;
  }
  a {
    color: #181919;
    font-size: 18px;
    font-weight: 400;
  }
`;

const DateField = styled.th`
  font-size: 12px;
  font-weight: 400;
  vertical-align: center;
  padding-left: 20px;
`;

const getUsersWhoCompletedSurvey = ({ startAfter, perPage }) => {
  const collection = firebase.firestore().collection("survey-results");
  return collection
    .orderBy("date", "desc")
    .startAfter(startAfter)
    .limit(perPage)
    .get()
    .then(querySnapshot => {
      // TODO: rename
      const tempDoc = [];
      querySnapshot.forEach(doc => {
        const { id, name, date } = doc.data();
        tempDoc.push({
          id,
          name,
          date
        });
      });

      return tempDoc;
    });
};

export const List = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(undefined);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    // TODO survey results
    // page === 1 ? new Date() : docs[docs.length - 1].date
    getUsersWhoCompletedSurvey({
      perPage: 5,
      startAfter: page === 1 ? new Date() : users[users.length - 1].date
    })
      .then(x => {
        if (x.length < 5) {
          setNoMoreData(true);
        } else {
          setUsers(docs => [...docs, ...x]);
        }
      })
      .catch(setError);
  }, [page]);

  const { currentUser, isUserLoading } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <h2>Список заполнивших форму</h2>
      {/* */}
      <Table>
        <tbody>
          {/* TODO: userData -> user, docs -> users */}
          {/* TODO: why id is not unique */}
          {/* TODO: put loader */}
          {users.map(userData => {
            return (
              <tr key={userData.id}>
                <th>
                  <a href={getLinktoUserProfile(userData.id)}>
                    {userData.name}
                  </a>
                </th>
                <DateField>{getCurrentDate(userData.date)}</DateField>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button onClick={() => setPage(x => x + 1)}>Загрузить еще</button>
    </Container>
  );
};
