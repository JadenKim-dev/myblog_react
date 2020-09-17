import React, {useState, useEffect} from "react";
import {useAxios} from "api";
import {useAppContext} from "store";
import UserContent from "components/UserContent";

export default function Profile({ user_id }) {
  const {store: {jwtToken, username}} = useAppContext()
  const [userData, setUserData] = useState({pk: "", username: "", email: "", avatar_url: ""})
  const headers = {Authorization: `JWT ${jwtToken}`}
  const [{data: origUserData, loading, error}, refetch] = useAxios({
    url: `/api/users/${user_id}/`,
    method: 'GET',
    headers,
  })
  useEffect(() => {
    if (origUserData) {
      setUserData(origUserData)
    }
    else {
      return
    }
  }, [origUserData])

  return (
    <UserContent userData={userData} request_username={username} />
  )
}
