import React, {useState} from "react";
import {Card} from "antd"
import {axiosInstance} from "api";
import SignupForm from "components/SignupForm"
import MyCard from "components/MyCard"

export default function Signup() {
  return(
    <MyCard title="회원가입">
      <SignupForm />
    </MyCard>
  )
}