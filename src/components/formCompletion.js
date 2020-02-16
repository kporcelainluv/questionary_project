import React from "react";
import styled from "styled-components";

import completedPic from "../img/finishedAlertPic.jpg";
import { MediaWidth } from "../consts";

const Container = styled.div`
  width: 340px;
  margin: 30% auto;
  background-color: #f9f9f9;
  font-family: "Montserrat", "PT Sans", sans-serif;
  h2 {
    color: #181919;
    font-weight: 400;
    text-align: center;
  }
  @media ${MediaWidth.TABLET} {
    margin-top: 25%;
  }
  @media ${MediaWidth.LAPTOP} {
    margin-top: 10%;
  }
`;

export const FormCompletion = () => {
  return (
    <Container>
      <img
        src={completedPic}
        alt="изображение человека"
        height={300}
        width={240}
      />
      <h2>Форма отправлена, спасибо!</h2>
    </Container>
  );
};
