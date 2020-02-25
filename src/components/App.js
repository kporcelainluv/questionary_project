import React from "react";
import "firebase/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Form } from "./Form";
import { List } from "./List";
import { User } from "./User";
import { AuthProvider } from "./Auth";
import Login from "./Login";
import "../css/style.css";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path={"/list"} component={List} />
          <Route exact path={"/"} component={Form} />
          <Route exact path={"/form"} component={Form} />
          <Route
            exact
            path="/user/:id"
            render={props => <User id={props.match.params.id} />}
          />
          <Route exact path={"/login"} component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};
