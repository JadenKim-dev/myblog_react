import React from "react";
import {Route} from "react-router-dom"
import Signup from "./Signup";

export default function AccountsRoutes({ match }) {
  return(
    <div>
      <Route exact path={match.url + "/signup"} component={Signup} />
    </div>
  )
}