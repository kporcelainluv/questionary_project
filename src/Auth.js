import React, { useEffect, useState } from "react";
import { firebaseApp } from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isUserLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      setIsLoading(false);
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isUserLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
