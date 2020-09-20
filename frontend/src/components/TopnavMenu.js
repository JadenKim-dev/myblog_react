import React from "react";
import { useHistory } from "react-router-dom"
import { Button } from "antd";
import { useAppContext, deleteToken } from "store"

export default function TopnavMenu() {
  const history = useHistory()
  const {store: {isAuthenticated}, dispatch} = useAppContext()
  const handleClick = () => {
    dispatch(deleteToken())
    history.push("/accounts/login")
  }
  return (
    <>
        { isAuthenticated && (
           <>
            <Button value="logout" onClick={handleClick}>Logout</Button>
            <Button value="post" href="/posts/new">Post it</Button>
           </>
        )}
        {!isAuthenticated && (
          <>
            <Button value="login" href="/accounts/login">Login</Button>
            <Button value="signup" href="/accounts/signup">회원가입</Button>
          </>
        )} 
    </>
  )
}

