import React, {useEffect, useState} from "react"
import { Menu, Anchor } from "antd"
import { useAppContext, setAppTreeData } from "store"
import { useAxios } from "api";
import {getTreeDataFromCategoryList} from "utils/getTreeDataFromCategoryList"
const { SubMenu } = Menu;

const { Link } = Anchor;

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
  }

  return (
    <>
      <Anchor>
        <Link href="#" title="전체보기" />
      </Anchor>
      <Menu
        openKeys={treeData && treeData.map(mainCategory => String(mainCategory.value))}
        mode="inline"
        onSelect={handleMenuSelect}
      >
        {treeData && treeData.map(mainCategory => {
          return (
            <SubMenu
              key={mainCategory.value}
              title={mainCategory.title}
              onTitleClick={handleMenuSelect}
            >
              {mainCategory.children && mainCategory.children.map(subCategory => (
                <Menu.Item key={subCategory.value}>{subCategory.title}</Menu.Item>
              ))}
            </SubMenu>
          )
        })}
      </Menu>       
    </>
  )
}