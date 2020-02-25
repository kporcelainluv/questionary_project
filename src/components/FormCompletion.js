import React from "react";

import completedPic from "../img/finishedAlertPic.jpg";

export const FormCompletion = () => {
  return (
    <section className="form-completion__section">
      <img
        src={completedPic}
        alt="изображение человека"
        height={300}
        width={240}
      />
      <h2 className="form-completion__heading ">Форма отправлена, спасибо!</h2>
    </section>
  );
};
