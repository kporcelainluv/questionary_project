import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
// TODO use more specific file
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
// TODO use more specific file
import { ru } from "date-fns/locale";
import styled from "styled-components";
// TODO: separate libraries from your code!
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";

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

// TODO it won't work online, use window.location to get current url
const getLinktoUserProfile = id => {
  return `http://localhost:3000/user/${id}`;
};

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  color: #181919;
`;
const Heading = styled.h2`
  // TODO: make one font family
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  font-weight: 500;
  text-align: center;
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
    font-family: "Montserrat", "PT Sans", sans-serif;
    font-size: 18px;
    font-weight: 400;
  }
`;

const DateField = styled.th`
  color: #181919;
  font-family: "Montserrat", "PT Sans", sans-serif;
  font-size: 12px;
  font-weight: 400;
  vertical-align: center;
  padding-left: 20px;
`;

// TODO: add hover style, add cursor:pointer
const Button = styled.button`
  background-color: #181919;
  height: 50px;
  display: flex;
  margin: 20px auto 50px;
  justify-content: center;
  color: white;
  font-size: 18px;
  border-radius: 25px;
  border: 3px solid white;
  width: 300px;
  font-family: "Montserrat", "PT Sans", sans-serif;
`;

const getUsersWhoCompletedSurvey = ({ startAfter, perPage }) => {
  return firebase
    .firestore()
    .collection("survey-results")
    .events.orderBy("date", "desc")
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
  // TODO: rename as users
  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(undefined);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    // TODO survey results
    // page === 1 ? new Date() : docs[docs.length - 1].date
    getUsersWhoCompletedSurvey({
      perPage: 5,
      startAfter: page === 1 ? new Date() : docs[docs.length - 1].date
    })
      .then(x => {
        if (x.length < 5) {
          setNoMoreData(true);
        } else {
          setDocs(docs => [...docs, ...x]);
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
      <Heading>Список заполнивших форму</Heading>
      {/* */}
      <Table>
        <tbody>
          {/* TODO: userData -> user, docs -> users */}
          {/* TODO: why id is not unique */}
          {/* TODO: put loader */}
          {docs.map(userData => {
            return (
              <tr key={userData.id}>
                <th>
                  <a href={getLinktoUserProfile(userData.id)}>
                    {userData.name}
                  </a>
                </th>
                {/* TODO: move DateField to table */}
                <DateField>{getCurrentDate(userData.date)}</DateField>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={() => setPage(x => x + 1)}>Загрузить еще</Button>
    </Container>
  );
};
