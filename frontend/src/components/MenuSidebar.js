import React, {useEffect, useState} from "react"
import { Menu } from "antd"
import { useAppContext, setAppTreeData } from "store"
import { useAxios } from "api";

const { SubMenu } = Menu;

export default function MenuSidebar() {
  const {store: {jwtToken}, dispatch} = useAppContext();
  const headers = {Authorization: `JWT ${jwtToken}`}
  const [{ data: categoryList, loading, error }, refetch] = useAxios({
    url: "/api/categories/", 
    headers
  })
  const mainCategoryList = categoryList ? (categoryList.filter(
    function(element) {
      return element.parent === null
    }
  )) : null

  const treeData = []
  const childrenResponse = []

  mainCategoryList && mainCategoryList.forEach(mainCategory => {
    const subCategoryList = categoryList.filter(function(element) {
      return element.parent === mainCategory.id
    })
    subCategoryList.forEach(subCategory => {
      childrenResponse.push({
        title: subCategory.title,
        value: subCategory.id
      })
    })
    treeData.push ({
      title: mainCategory.title,
      value: mainCategory.id,
      children: childrenResponse
    })
  })

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