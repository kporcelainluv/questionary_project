import React from "react";
import styled from "styled-components";

const Label = styled.label`
  background-color: #181919;
  padding: 10px;
  color: white;
  border-radius: 25px;
  width: 150px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`;

export const UploadButton = ({ updateStateValue }) => {
  return (
    <Label htmlFor="img">
      <input
        type="file"
        name="img"
        id="img"
        multiple={false}
        accept=".jpg, .jpeg, .png"
        style={{ display: "none" }}
        onChange={() => {
          console.log(document.querySelector("#img").files[0]);
          updateStateValue("img", document.querySelector("#img"));
        }}
      />
      Загрузить
    </Label>
  );
};
