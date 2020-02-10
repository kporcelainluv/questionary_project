import React from "react";
import firebase from "firebase";

// TODO: why doesn't it work?
// const getAllDocumentsFromCollection = async props => {
//   const firestore = firebase.firestore();
//   const events = await firestore.collection("survey-results");
//   events.get().then(querySnapshot => {
//     const tempDoc = [];
//     querySnapshot.forEach(doc => {
//       tempDoc.push({ id: doc.id, ...doc.data() });
//     });
//     console.log(tempDoc);
//   });
//   return true;
// };

const getAllDocumentsFromCollection = () => {
  const firestore = firebase.firestore();
  const events = firestore.collection("survey-results");
  events.get().then(querySnapshot => {
    const tempDoc = [];
    querySnapshot.forEach(doc => {
      tempDoc.push({ id: doc.id, ...doc.data() });
    });
    console.log(tempDoc);
  });
  return true;
};

export const List = () => {
  return (
    <div>
      <h1>This is a list of people who filled oin the questionary</h1>
      {getAllDocumentsFromCollection()}
    </div>
  );
};
