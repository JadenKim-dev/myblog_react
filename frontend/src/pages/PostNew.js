import React from "react";
import PostNewForm from "components/PostNewForm";
import MyCard from "components/MyCard";

export default function PostNew() {
  return(
    <MyCard title="새 포스팅 쓰기">
      <PostNewForm />
    </MyCard>
  )
}