import React, {useState, useEffect} from "react";
import { TreeSelect } from "antd";
import { useAxios } from "api";

export default function CategorySelect({headers}) {
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  
  const [{ data: originCategoryList, loading, error }, refetch] = useAxios({
    url: "/api/categories/", 
    headers
  })

  useEffect(() => {
    if (!originCategoryList) setCategoryList([1,2,3])
    else setCategoryList(originCategoryList)
  }, [originCategoryList])
  
  console.log("categoryList: ", categoryList);

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
        value: subCategory.title
      })
    })
    treeData.push ({
      title: mainCategory.title,
      value: mainCategory.title,
      children: childrenResponse
    })
  })
  
  const handleSelectChange = value => {
    setSelectedCategory(value);
  };
  
  return(
    <TreeSelect
      value={selectedCategory}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="카테고리를 선택해주세요"
      onChange={handleSelectChange}
    />
  )
}