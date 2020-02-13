import React from "react";
import styled from "styled-components";
import completedPic from "../img/finishedAlertPic.jpg";
import { MediaWidth } from "../consts";

const Container = styled.div`
  width: 340px;
  margin: auto;
  margin-top: 35%;
  background-color: #f9f9f9;
  @media ${MediaWidth.TABLET} {
    margin-top: 25%;
  }
  @media ${MediaWidth.LAPTOP} {
    margin-top: 10%;
  }
`;

const Heading = styled.h2`
  font-family: "Montserrat", "PT Sans", sans-serif;
  color: #181919;
  font-weight: 400;
  text-align: center;
`;

export const FormCompletion = () => {
  return (
    <Container>
      <img src={completedPic} alt="" height={255} width={255} />
      <Heading>Форма отправлена, спасибо!</Heading>
    </Container>
  );
};
