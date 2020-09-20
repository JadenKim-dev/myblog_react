import React from "react";
import {Divider, Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons"
// import {API_HOST} from "Constants";


export default function UserContent({ userData, request_username }) {
  const {pk, username: profile_username, email, avatar_url} = userData;
  return (
    <>
      <div className="avatar">
         {avatar_url ? <Avatar size="large" src={avatar_url} size={128} /> : 
                 <Avatar size="large" icon={<UserOutlined />} size={128} /> }
         {request_username === profile_username && (
          <>
           <Button href={`/accounts/profile/${pk}/edit`} style={{ marginBottom: "0.5rem" }}>프로필 수정하기</Button>
           <Button href={`/accounts/profile/${pk}/change_password`} type="primary">비밀번호 바꾸기</Button>
          </>
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
