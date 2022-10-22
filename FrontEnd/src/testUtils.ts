import React from "react";
import UserContext from "./auth/UserContext";

let demoUser: object;
 demoUser = {
  email: "email@gmail.com",
  firstName: "Hello",
  lastName: "World",
  password: "password",
};

let UserProvider:object = ({ children:any, currentUser:object = demoUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
