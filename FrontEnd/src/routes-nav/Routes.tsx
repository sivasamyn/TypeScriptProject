import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/dashboard/Dashboard";
import LocationContent from "../components/dashboard/LocationContent";
import LocationList from "../components/locations/locationList";
import UserAccount from "../components/account/UserAccount";
import MyProfile from "../components/account/MyProfile";

function Routes(login:Element, signup:Element, logout:Element) {
  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <SignIn login={login} />
        </Route>

        <Route exact path="/signup">
          <SignUp signup={signup} />
        </Route>

        <PrivateRoute exact path="/dashboard">
          <Dashboard logout={logout}>
            <LocationContent />
          </Dashboard>
        </PrivateRoute>

        <PrivateRoute exact path="/location-list">
          <Dashboard logout={logout}>
            <LocationList />
          </Dashboard>
        </PrivateRoute>

        <PrivateRoute exact path="/my-account">
          <Dashboard logout={logout}>
            <UserAccount />
          </Dashboard>
        </PrivateRoute>

        <PrivateRoute exact path="/my-profile">
          <Dashboard logout={logout}>
            <MyProfile />
          </Dashboard>
        </PrivateRoute>

  

        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default Routes;
