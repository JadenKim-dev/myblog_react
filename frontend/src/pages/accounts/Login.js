import React from "react"
import {useAppContext} from "store"
import MyCard from "components/MyCard"
import LoginForm from "components/LoginForm"

export default function Login() {
  return (
    <MyCard title="로그인" >
      <LoginForm />
    </MyCard>
  )
}