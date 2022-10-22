import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import LocationApi from "./api/api";
import jwt from "jsonwebtoken";
import LoadingSpinner from "./common/LoadingSpinner";
import Routes from "./routes-nav/Routes";

export const TOKEN_STORAGE_ID:string = "app-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
           // let { email } = jwt.decode(token);
            let email:any = jwt.decode(token);
            LocationApi.token = token;
            let currentUser = await LocationApi.getCurrentUser(email);
            setCurrentUser(currentUser);
          } catch (err) {
            console.log("error: ", err);
            setCurrentUser('');
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  function logout() {
    setCurrentUser('');
    setToken(null);
  }

  async function signup(signupData:any):Promise<object> {
    try {
      let token:any = await LocationApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.log("sign up error: ", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData:any):Promise<object> {
    try {
      let token:any = await LocationApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.log("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Routes login={login} signup={signup} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
