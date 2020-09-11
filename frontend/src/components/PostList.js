import React from "react";
import {useAxios} from "api";
import Post from "./Post"

export default function PostList() {
  const [{data: postList, loading, error}, refetch] = useAxios(
    "/api/posts/"
  )
  
  return(
    <div>
      {postList && postList.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}