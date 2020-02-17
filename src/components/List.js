import React, { useContext, useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import ru from "date-fns/locale/ru";
import formatDistance from "date-fns/formatDistance";
import styled from "styled-components";
import differenceInDays from "date-fns/differenceInDays";

import { AuthContext } from "../Auth";
import { Loader } from "./Loader";

const formatCompletionDate = timestamp => {
  const date = fromUnixTime(timestamp["seconds"]);
  const daysDifference = differenceInDays(new Date(), date);

  if (daysDifference > 7) {
    return format(date, "d LLL yyyy k:MM", {
      locale: ru
    });
  }
  return `${formatDistance(date, new Date())} ago`;
};

const getLinkToUserProfile = id => {
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
  return firebase
    .firestore()
    .collection("survey-results")
    .orderBy("date", "desc")
    .startAfter(startAfter)
    .limit(perPage)
    .get()
    .then(surveys => {
      const users = [];
      surveys.forEach(user => {
        const { id, name, date } = user.data();
        users.push({
          id,
          name,
          date
        });
      });

      return users;
    });
};

export const List = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(undefined);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    getUsersWhoCompletedSurvey({
      perPage: 5,
      startAfter: page === 1 ? new Date() : users[users.length - 1].date
    })
      .then(surveyResult => {
        if (surveyResult.length < 5) {
          setNoMoreData(true);
        } else {
          setUsers(users => [...users, ...surveyResult]);
        }
      })
      .catch(setError);

    document.title = "Список пользователей";
  }, [page]);

  const { currentUser, isUserLoading } = useContext(AuthContext);

  if (!currentUser && !isUserLoading) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      {isUserLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2>Список заполнивших форму</h2>
          <Table>
            <tbody>
              {users.map(user => {
                return (
                  <tr key={user.date.seconds}>
                    <th>
                      <a href={getLinkToUserProfile(user.id)}>
                        {user.name ? user.name : "Имя не указано"}
                      </a>
                    </th>
                    <DateField>{formatCompletionDate(user.date)}</DateField>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {!noMoreData && (
            <button onClick={() => setPage(x => x + 1)}>Загрузить еще</button>
          )}
        </Fragment>
      )}
    </Container>
  );
};
