import React from "react";
import PostList from "components/PostList";
import AppLayout from "components/AppLayout";
import { useAppContext, setTreeData } from "store";
import { useAxios } from "api";

export default function Home() {
  return(
    <div>
      <PostList />
    </div>
  )
}