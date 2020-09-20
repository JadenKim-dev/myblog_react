import React, {useState, useEffect} from "react";
import MyCard from "components/MyCard";
import ProfileEditForm from "components/ProfileEditForm";
import {useAppContext} from "store";
import {useAxios} from "api";

export default function ProfileEdit({ match }) {
  const {store: {jwtToken}} = useAppContext();
  const headers = {Authorization: `JWT ${jwtToken}`}
  const [userData, setUserData] = useState({ username: "", avatar_url: "", phone_number: "", gender:"", email:"", birth_date:"" });
  const [{data: origUserData, loading, error}, refetch] = useAxios({
    url: `/api/users/${match.params.user_id}/?fields=username,avatar_url,phone_number,gender,email,birth_date`,
    method: "GET",
    headers,
  })
  useEffect(() => {
    if(origUserData) {
      console.log(origUserData)
      setUserData(origUserData);      
    }
    else {
      return;
    }
  }, [origUserData])
  
  return (
    <MyCard title="프로필 수정하기" >
      <ProfileEditForm userData={userData} user_id={match.params.user_id} />
    </MyCard>
  )
}