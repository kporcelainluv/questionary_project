const functions = require("firebase-functions");

const createLink = ({ id, name }) => {
  const text = `${name} заполнила форму, посмотреть можно по ссылке https://zhukovairina.now.sh/user/${id}`;
  const reminderText = `https://zhukovairina.now.sh/ - ссылка на форму; https://zhukovairina.now.sh/list - список пользователей, заполнивших форму`;
  return encodeURI(
    `https://api.telegram.org/bot${
      functions.config().token.id
    }/sendMessage?chat_id=${functions.config().chatid.id}&text=${text +
      reminderText}`
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
