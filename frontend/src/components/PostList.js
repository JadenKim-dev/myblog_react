import React, {useEffect, useState} from "react";
import {useAxios} from "api";
import Post from "./Post"
import { useAppContext } from "store";

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
    console.log("origPostList: ", origPostList)
  }, [origPostList])
  
  return(
    <div>
      {postList && postList.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}
