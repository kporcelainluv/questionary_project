import React from "react";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { User } from "./components/User";

const PAGES = {
  LIST: "/list",
  FORM: "/form",
  USER: "/user"
};

export const App = () => {
  const currentLocation = window.location.pathname;
  switch (currentLocation) {
    case PAGES.LIST:
      return <List />;
    case PAGES.FORM:
      return <Form />;
    case PAGES.USER:
      return <User />;
    default:
      return <Form />;
  }
};
