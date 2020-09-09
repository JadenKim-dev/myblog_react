import React from "react";
import {Route} from "react-router-dom"
import Signup from "./Signup";
import Login from "./Login";

export default function AccountsRoutes({ match }) {
  return(
    <div>
      <Route exact path={match.url + "/signup"} component={Signup} />
      <Route exact path={match.url + "/login"} component={Login} />
    </div>
  )
}