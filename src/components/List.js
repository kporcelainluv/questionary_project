import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";

const getCurrentDate = timestamp => {
  return format(new Date(timestamp["seconds"] * 1000), "d LLL yyyy k:MM", {
    locale: ru
  });
};

const getLinktoUserProfile = id => {
  return `http://localhost:3000/user/${id}`;
};

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
`;

const Table = styled.table`
  display: table;
  margin: auto;
`;
const TableBody = styled.tbody`
  text-align: left;
  line-height: 30px;
`;
const UserNameField = styled.a`
  color: #181919;
  font-family: "Montserrat", "PT Sans", sans-serif;
  font-size: 18px;
  font-weight: 400;
`;

const DateField = styled.th`
  color: #181919;
  font-family: "Montserrat", "PT Sans", sans-serif;
  font-size: 12px;
  font-weight: 400;
  vertical-align: center;
  padding-left: 20px;
`;

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

export const List = () => {
  const [docs, setDocs] = useState([]);
  const firestore = firebase.firestore();
  const events = firestore.collection("survey-results");

  useEffect(() => {
    let userDocs = events.orderBy("date", "desc").limit(5);
    userDocs.get().then(querySnapshot => {
      const tempDoc = [];
      querySnapshot.forEach(doc => {
        tempDoc.push({
          id: doc.id,
          name: doc.data()["name"],
          date: doc.data()["date"]
        });
      });
      setDocs(docs => [...docs, ...tempDoc]);
    });
  }, []);

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Heading>Список заполнивших форму</Heading>
      <Table>
        <TableBody>
          {docs.map(userData => {
            return (
              <tr key={userData.id}>
                <th>
                  <UserNameField href={getLinktoUserProfile(userData.id)}>
                    {userData.name}
                  </UserNameField>
                </th>
                <DateField>{getCurrentDate(userData.date)}</DateField>
              </tr>
            );
          })}
        </TableBody>
      </Table>
      <Button
        onClick={() => {
          const lastQuery = docs[docs.length - 1];

          let userDocs = events
            .orderBy("date", "desc")
            .startAfter(lastQuery.date)
            .limit(5);
          userDocs.get().then(querySnapshot => {
            const tempDoc = [];
            querySnapshot.forEach(doc => {
              tempDoc.push({
                id: doc.id,
                name: doc.data()["name"],
                date: doc.data()["date"]
              });
            });

            setDocs(docs => [...docs, ...tempDoc]);
          });
        }}
      >
        Загрузить еще
      </Button>
    </Container>
  );
};
