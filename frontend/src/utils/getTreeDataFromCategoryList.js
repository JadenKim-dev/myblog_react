export function getTreeDataFromCategoryList(categoryList) {
  return new Promise((resolve, reject) => {
    try {
      const mainCategoryList = categoryList instanceof Array ? (categoryList.filter(
        function(element) {
          return element.parent === null
        }
      )) : null
      const treeData = mainCategoryList instanceof Array ? mainCategoryList.map(mainCategory => {
        const subCategoryList = categoryList.filter(function(element) {
          return element.parent === mainCategory.id
        })
        return ({
          selectable: false,
          title: mainCategory.title,
          value: mainCategory.id,
          children: subCategoryList.map(subCategory => ({
            title: subCategory.title,
            value: subCategory.id
          }))
        })
      }): null
      resolve(treeData);
    }
    catch(error) {
      reject(error)
    }
  })
}
                     