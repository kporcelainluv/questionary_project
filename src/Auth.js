import React, { useEffect, useState } from "react";
import { firebaseApp } from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    currentUser: undefined,
    isUserLoading: true
  });

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      setAuth({ currentUser: user, isUserLoading: false });
    });
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
