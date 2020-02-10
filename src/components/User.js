import React from "react";
import firebase from "firebase";

const getUser = id => {
  const firestore = firebase.firestore();

  const docRef = firestore.doc(`survey-results/${id}`);
  docRef.get().then(doc => {
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log({ myData });
    }
  });
};

export const User = ({ id }) => {
  console.log("in user comp", { id });
  return (
    <div>
      <h1>This is a user info page!</h1>
      {getUser(id)}
    </div>
  );
};
