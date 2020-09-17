import React from "react";
import UserContentContainer from "components/container/UserContentContainer";
import PostPictureList from "components/PostPictureList";
import "./ProfileShow.scss";
export default function Profile({ match }) {
  return (
    <div className="profile-page">
      <div className="user-content">
        <UserContentContainer user_id={match.params.user_id} />
      </div>
      <div className="post-content">
        <PostPictureList user_id={match.params.user_id} />
      </div>
    </div>
  )
}