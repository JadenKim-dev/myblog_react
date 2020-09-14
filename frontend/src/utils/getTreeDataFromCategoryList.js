export function getTreeDataFromCategoryList(categoryList) {
  return new Promise((resolve, reject) => {
    const treeData = []
    const childrenResponse = []
    const mainCategoryList = categoryList ? (categoryList.filter(
      function(element) {
        return element.parent === null
      }
    )) : null
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
    resolve(treeData);
  })
}