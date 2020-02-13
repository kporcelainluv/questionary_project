const functions = require("firebase-functions");

const createLink = ({ id, name }) => {
  const text = `${name} заполнила форму, посмотреть можно по ссылке https://questionaryproject.now.sh/user/${id}`;

  return encodeURI(
    `https://api.telegram.org/bot${
      functions.config().token.id
    }/sendMessage?chat_id=${functions.config().chatid.id}&text=${text}`
  );
};

exports.onAddingNewUser = functions
  .region("europe-west1")
  .firestore.document("survey-results/{surveyId}")
  .onCreate((snap, context) => {
    const name = snap.data()["name"];
    const id = snap.data()["id"];

    fetch(createLink({ id, name }))
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  });
