import React from "react";
import {Route} from "react-router-dom"
import Home from "./Home";
import AccountsRoutes from "./accounts"

export default function Root() {
  return(
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/accounts" component={AccountsRoutes} />
    </div>
  )
}