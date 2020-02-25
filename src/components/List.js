import React, { useContext, useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import ru from "date-fns/locale/ru";
import formatDistance from "date-fns/formatDistance";
import differenceInDays from "date-fns/differenceInDays";

import { AuthContext } from "./Auth";
import { Loader } from "./Loader";
import { Error } from "./Error";

const formatCompletionDate = timestamp => {
  const date = fromUnixTime(timestamp["seconds"]);
  const daysDifference = differenceInDays(new Date(), date);

  if (daysDifference > 7) {
    return format(date, "d LLL yyyy k:MM", {
      locale: ru
    });
  }
  return `${formatDistance(date, new Date(), { locale: ru })} назад`;
};

const getLinkToUserProfile = id => {
  return `${window.location.origin}/user/${id}`;
};

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
    })
    .catch(e => {
      console.log("ОШИБКА", { e });
    });
};

export const List = () => {
  const [state, setState] = useState({
    users: [],
    page: 1,
    error: false,
    noMoreData: false
  });

  useEffect(() => {
    getUsersWhoCompletedSurvey({
      perPage: 5,
      startAfter:
        state.page === 1 ? new Date() : state.users[state.users.length - 1].date
    })
      .then(surveyResult => {
        if (surveyResult.length < 5) {
          setState(s => ({
            ...s,
            noMoreData: true
          }));
        }
        setState(s => ({ ...s, users: [...state.users, ...surveyResult] }));
      })
      .catch(e => {
        console.log("ОШИБКА", { e });
        setState(s => ({ ...s, error: true }));
      });

    document.title = "Список пользователей";
  }, [state.page]);

  const { currentUser, isUserLoading } = useContext(AuthContext);

  if (!currentUser && !isUserLoading) {
    return <Redirect to="/login" />;
  }
  if (state.error) {
    return (
      <section>
        <Error />
      </section>
    );
  }

  return (
    <section>
      {isUserLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="list__heading">Список заполнивших форму</h2>
          <table>
            <tbody>
              {state.users.map(user => {
                return (
                  <tr key={user.date.seconds}>
                    <th>
                      <a href={getLinkToUserProfile(user.id)}>
                        {user.name ? user.name : "Имя не указано"}
                      </a>
                    </th>
                    <th>{formatCompletionDate(user.date)}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!state.noMoreData && (
            <button
              className="button-short"
              onClick={() => setState(s => ({ ...s, page: s.page + 1 }))}
            >
              Загрузить еще
            </button>
          )}
        </Fragment>
      )}
    </section>
  );
};
