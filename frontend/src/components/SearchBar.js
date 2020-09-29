import React from "react";
import {useHistory} from "react-router-dom";
import {Input} from "antd";


export default function SearchBar() {
  const history = useHistory()
  const handleSearch = inputValue => {
    history.push(`?search=${inputValue}`)
  }
  return (
    <Input.Search onSearch={handleSearch} size="large"/>
  )
}