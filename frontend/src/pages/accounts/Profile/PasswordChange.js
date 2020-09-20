import React from "react"
import PasswordChangeForm from "components/PasswordChangeForm"
import MyCard from "components/MyCard";

export default function UserConfirm({ match }) {
  return (
    <MyCard title="비밀번호 바꾸기">
      <PasswordChangeForm user_id={match.params.user_id} />
    </MyCard>
  )
}