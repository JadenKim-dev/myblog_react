import React, {useEffect, useState} from "react";
import {useAxios} from "api";
import Post from "./Post"
import { useAppContext } from "store";
import {axiosInstance} from "api";

export default function PostList() {
  const {store: {jwtToken}} = useAppContext();
  const [postList, setPostList] = useState([])
  const headers = {Authorization: `JWT ${jwtToken}`}
  const [{data: origPostList, loading, error}, refetch] = useAxios({
    url: "/api/posts/",
    headers
  })
  useEffect(() => {
    setPostList(origPostList)
  }, [origPostList])

  const handleLike = async ({post, isLike}) => {
    const apiUrl = `/api/posts/${post.id}/like/`;
    const method = isLike ? 'post' : 'delete';
    const addNum = isLike ? 1 : -1
    const old_like_number = post.like_user_number
    try {
      await axiosInstance({
        url: apiUrl,
        method,
        headers
      })
      setPostList(prevList => {
        return prevList.map(currentPost => (
          currentPost === post 
            ? {...currentPost, is_like: isLike, like_user_number : old_like_number + addNum}
            : currentPost
        ));
      });
    }catch(error) {
      console.log(error)
    }
  }
  return(
    <div>
      {postList && postList.map(post => (
        <Post key={post.id} post={post} handleLike={handleLike}/>
      ))}
    </div>
  )
}
