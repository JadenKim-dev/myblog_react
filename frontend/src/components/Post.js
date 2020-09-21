import React from "react";
import PostList from "components/PostList";
import { Avatar, Card, Divider, Image, Typography } from 'antd';
import { UserOutlined, HeartTwoTone, HeartOutlined, BarsOutlined } from '@ant-design/icons';
import {useAppContext} from "store";

const { Text, Link } = Typography;

export default function Post({ post, handleLike }) {
  const { id, author, title, content, photo, post_category, tag_list, is_like, created_at, like_user_number } = post;
  const { pk, username, name, avatar_url } = author;
  const {store:{jwtToken}} = useAppContext()
  const headers = {Authorization: `JWT ${jwtToken}`}

  const handleCommentClick = e => {
    console.log("CommentClick")
  }
  return(
    <div className="post" style={{ marginBottom: "1.5em" }}>
      <Card
        style={{ width: "700px" }}
        actions={[
          <div 
            key="like"
            onClick={() => handleLike({post, isLike: !is_like})}
          >
            {is_like && (
              <HeartTwoTone 
                twoToneColor="#eb2f96" 
                style={{ display: "inline", marginRight: "0.3em" }}
              />
            )}
            {!is_like && (
              <HeartOutlined 
                style={{ display: "inline", marginRight: "0.3em" }} 
              />
            )}
            <div style={{ display: "inline", fontSize:"0.9em" }}>{like_user_number}</div>
          </div>,
          <div key="comment" onClick={handleCommentClick}>
            <BarsOutlined style={{ display: "inline", marginRight: "0.3em" }}/>
            <div style={{ display: "inline", fontSize:"0.9em" }}>12</div>
          </div>     
        ]}
      >
        <Card.Meta
          avatar={avatar_url ? <Avatar size="large" src={avatar_url} /> : 
                 <Avatar size="large" icon={<UserOutlined />} /> }
          title={<a href={`/accounts/profile/${pk}/`} style={{color: "black"}}>{username}</a>} /*TODO: 클릭 시 프로필 페이지로 이동 */
          description={created_at}
        />
        <Divider />
        <h2>{title}</h2>
        <Image src={photo} width={500} />
        <pre style={{ fontSize: "1.2em" }}>{content}</pre>
      </Card>
    </div>
  )
}