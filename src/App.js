import React from "react";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { User } from "./components/User";
import { AuthProvider } from "./Auth";
import { firebaseApp } from "./base";
import "firebase/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";

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
            render={props => <User {...props.match.params} />}
          />
          <Route exact path={"/login"} component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};
