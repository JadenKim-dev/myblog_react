import React, {useEffect, useState} from "react"
import { Menu } from "antd"
import { useAppContext, setAppTreeData } from "store"
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

  return (
    <>
      <Menu
        defaultOpenKeys={['1']}
        mode="inline"
      >
        {treeData && treeData.map(mainCategory => {
          return (
            <SubMenu
              key={mainCategory.value}
              title={mainCategory.title}
            >
              {mainCategory.children && mainCategory.children.map(subCategory => (   /*forEach가 아닌 map 사용!!!!*/
                <Menu.Item key={subCategory.value}>{subCategory.title}</Menu.Item>
              ))}
            </SubMenu>
          )
        })}
      </Menu>       
    </>
  )
}