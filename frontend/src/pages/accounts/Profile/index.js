import React from "react"
import {Route} from "react-router-dom"
import ProfileShow from "./ProfileShow";
import ProfileEdit from "./ProfileEdit";
import PasswordChange from "./PasswordChange";

export default function AccountsProfileRoutes({ match }) {
  return(
    <div>
      <Route exact path={match.url + "/:user_id/edit"} component={ProfileEdit} /> 
      <Route exact path={match.url + "/:user_id/change_password"} component={PasswordChange} />
      <Route exact path={match.url + "/:user_id"} component={ProfileShow} /> 
    </div>
  )  
}