import React from "react";

export default function ProfileEdit({ match }) {
  return (
    <>
      <div>ProfileEdit</div>
      <div>{ match.params.user_id }</div>
    </>
  )
}