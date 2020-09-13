import React, {useEffect} from "react";
import {useAxios} from "api";
import Post from "./Post"

export default function PostList() {
  // const [postList, setPostList] = useState([])
  const [{data: postList, loading, error}, refetch] = useAxios(
    "/api/posts/"
  )
  // useEffect(() => {
  //   setPostList(origPostList)
  // }, origPostList)
  
  return(
    <div>
      {postList && postList.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}