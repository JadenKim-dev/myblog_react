import React from "react";
import {Route} from "react-router-dom"
import Home from "./Home";
import AccountsRoutes from "./accounts"
import PostNew from "./PostNew";
import AppLayout from "components/AppLayout";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

export default function Root() {
  return(
    <AppLayout>
      <LoginRequiredRoute exact path="/" component={Home} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <Route path="/accounts" component={AccountsRoutes} />
    </AppLayout>
  )
}