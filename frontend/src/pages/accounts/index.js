import React from "react";
import {Route} from "react-router-dom"
import Signup from "./Signup";
import Login from "./Login";
import AccountsProfileRoutes from "./Profile";

export default function AccountsRoutes({ match }) {
  return(
    <div>
      <Route exact path={match.url + "/signup"} component={Signup} />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route path={match.url + "/profile"} component={AccountsProfileRoutes} /> 
    </div>
  )    //TODO: user_id 대신 username을 받아서 id로 변환
}