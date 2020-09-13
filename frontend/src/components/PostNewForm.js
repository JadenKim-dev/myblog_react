import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Upload, Modal, Button, TreeSelect, notification} from "antd";
import { SmileTwoTone, PlusOutlined } from "@ant-design/icons"
import {useAppContext} from "store";
import { getBase64FromFile } from "utils/base64";
import { axiosInstance, useAxios } from "api";
// import CategorySelect from "./CategorySelect";

export default function PostNewForm() {
  const history = useHistory();
  const { store } = useAppContext();
  const { jwtToken } = store;
  console.log(store)
  const headers = {Authorization: `JWT ${jwtToken}`}
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  
  const handleFinish = async values => {
    const {title, photo: {fileList}, content} = values;
    const formData = new FormData();
    formData.append("title", title);
    fileList.forEach(file => {
      formData.append("photo", file.originFileObj);
    })
    formData.append("content", content);
    formData.append("post_category", selectedCategory);
    try {
      await axiosInstance.post("/api/posts/", formData, {headers})
      notification.open({
        message: "포스팅 작성을 완료했습니다",
        description: "홈화면으로 이동합니다",
        icon: <SmileTwoTone />
      })
      history.push("/");
    }
    catch(error) {
      if (error.response) {
      }
    }  
  }
  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  })

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  }

  const handlePreviewPhoto = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj)
    }
    setPreviewPhoto({
      visible: true, 
      base64: file.url || file.preview
    })    
  }

  const [{ data: originCategoryList, loading, error }, refetch] = useAxios({
    url: "/api/categories/", 
    headers
  })

  useEffect(() => {
    if (!originCategoryList) setCategoryList([1,2,3])
    else setCategoryList(originCategoryList)
  }, [originCategoryList])

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
  }) //TODO: treeData를 AppContext를 통해 한번만 불러오도록 처리
  
  const handleSelectChange = value => {
    setSelectedCategory(value);
  };
  
  return(
    <Form onFinish={handleFinish} layout="vertical">
      <Form.Item
        label="제목"
        name="title"
        rules={[
          {required: true, message:"제목을 입력해주세요!"}
        ]}
      >
        <Input placeholder="input title" />
      </Form.Item>
      
      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요." }]}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
          onPreview={handlePreviewPhoto}
        >
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      
      <Form.Item
        label="글"
        name="content"
        rules={[
          {required: true, message:"글을 입력해주세요!"}
        ]}
      >
        <Input placeholder="input caption" />
      </Form.Item>

      <Form.Item
        label="카테고리"
        name="category"
      >
        <TreeSelect
          value={selectedCategory}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="카테고리를 선택해주세요"
          onChange={handleSelectChange}
        />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          작성하기
        </Button>
      </Form.Item>

      <Modal 
        visible={previewPhoto.visible} 
        footer={null} 
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        <img 
          src={previewPhoto.base64} 
          style={{ width: "100%" }} 
          alt="Preview" 
        />
      </Modal>

    </Form>
  )
}