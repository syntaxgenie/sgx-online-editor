import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./other-screens/home/Home";
import Login from "./other-screens/login/Login";
import Main from "./main-screen/Main";

const Routes = () => {
  return (
    <Switch>
       <Route path="/home" render={() => <Main />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/" render={() => <Home />} />
     
    </Switch>
  );
};

export default Routes;
