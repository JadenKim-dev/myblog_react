import React from "react";
import {Divider, Avatar, Button} from "antd";
// import {API_HOST} from "Constants";


export default function UserContent({ userData, request_username }) {
  const {pk, username: profile_username, email, avatar_url} = userData;
  console.log(profile_username)
  return (
    <>
      <div className="avatar">
         <Avatar src={avatar_url} alt="avatar" size={128} />
         {request_username === profile_username && (
           <Button href={`/accounts/profile/${pk}/edit`}>프로필 수정하기</Button>
         )}
      </div>
      <div className="user-info">
        <h1>{profile_username}</h1>
        <hr />
        <h1>email: {email}</h1>
        <hr />
        <h1>blahblah</h1>
      </div>
    </>
  )
}
