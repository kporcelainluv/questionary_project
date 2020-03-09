const functions = require("firebase-functions");
const fetch = require("node-fetch");

const createLink = ({ id, name, chatId }) => {
  const text = `${name} заполнила форму, посмотреть можно по ссылке https://zhukovairina.now.sh/user/${id} `;
  return encodeURI(
    `https://api.telegram.org/bot${
      functions.config().token.id
    }/sendMessage?chat_id=${chatId}&text=${text }`
  );
};

exports.onAddingNewUser = functions
  .region("europe-west1")
  .firestore.document("survey-results/{surveyId}")
  .onCreate((snap, context) => {
    const name = snap.data()["name"];
    const id = snap.data()["id"];
    const sendMessageToMe = fetch(createLink({ id, name, chatId: "98266189" }));
    const sendMessageToMom = fetch(
      createLink({ id, name, chatId: "132097728" })
    );

    Promise.all([sendMessageToMe, sendMessageToMom])
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  });
