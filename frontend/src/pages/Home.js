import React from "react";
import queryString from 'query-string';
import PostList from "components/PostList";
import AppLayout from "components/AppLayout";
import { useAppContext, setTreeData } from "store";
import { useAxios } from "api";

export default function Home({ location }) {
  return(
    <div>
      <PostList queryString={location.search} />
    </div>
  )
}