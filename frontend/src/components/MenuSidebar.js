import React, {useEffect, useState} from "react"
import { Menu } from "antd"
import { useAppContext, setAppTreeData, setCategoryKey } from "store"
import { useAxios } from "api";
import {getTreeDataFromCategoryList} from "utils/getTreeDataFromCategoryList"
const { SubMenu } = Menu;

export default function MenuSidebar() {
  const {store: {jwtToken, isAuthenticated}, dispatch} = useAppContext();
  const headers = {Authorization: `JWT ${jwtToken}`}
  const [treeData, setTreeData] = useState([])
  const [{ data: categoryList, loading, error }, refetch] = useAxios({
    url: "/api/categories", 
    headers
  })
  useEffect(() => {
    getTreeDataFromCategoryList(categoryList).then((treeDataToSet) => {
      setTreeData(treeDataToSet);
      dispatch(setAppTreeData(treeDataToSet))
    }).catch(err => {
      console.log(err);
    })
  }, [categoryList])

  useEffect(() => {
    dispatch(setAppTreeData(treeData))
  }, [treeData])

  const handleMenuSelect = ({key}) => {
    console.log(key)
    if (key === "-1") {
      dispatch(setCategoryKey(""))
    }
    else{
      dispatch(setCategoryKey(key)) 
    }
  }

  return (
    <>
      <Menu
        openKeys={treeData && treeData.map(mainCategory => mainCategory.title)}
        mode="inline"
        onSelect={handleMenuSelect}
        defaultSelectedKeys={["-1"]}
      >
        <Menu.Item key={-1} >전체보기</Menu.Item>
        {treeData && treeData.map(mainCategory => {
          return (
            <SubMenu
              key={mainCategory.title}
              title={mainCategory.title}
              /*onTitleClick={handleMenuSelect}*/
            >
              {mainCategory.children && mainCategory.children.map(subCategory => (
                <Menu.Item key={subCategory.title}>{subCategory.title}</Menu.Item>
              ))}
            </SubMenu>
          )
        })}
      </Menu>       
    </>
  )
}