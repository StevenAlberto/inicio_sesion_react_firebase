import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

//auth necesario de firebase para la conecxión
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    })
  }, [])

  //Metodos invocados con aut. para la comprobacion en cada parte

  const signup = (correo, contraseña) => {
    return auth.createUserWithEmailAndPassword(correo, contraseña);
  }

  const login = (correo, contraseña) => {
    return auth.signInWithEmailAndPassword(correo, contraseña);
  }

  const logout = () => auth.signOut();

  const value = {
    currentUser,
    login,
    logout,
    signup
  };
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

