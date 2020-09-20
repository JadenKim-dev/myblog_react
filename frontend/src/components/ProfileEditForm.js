import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import {Form, Input, Button, Select, DatePicker, notification, Upload} from "antd";
import { SmileTwoTone, FrownTwoTone, PlusOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons"
import {useAppContext} from "store"
import {axiosInstance} from "api"
const {Option} = Select;

export default function ProfileEditForm({ userData, user_id }) {
  const [fileList, setFileList] = useState([]);
  const [isFileChanged, setIsFileChanged] = useState(false);
  const [form] = Form.useForm();
  const { store: {jwtToken} } = useAppContext();
  const headers = {Authorization: `JWT ${jwtToken}`}
  const history = useHistory()
  useEffect(() => {
    form.resetFields()
    setFileList([
      {
        uid: "-1",
        status: "done",
        url: userData.avatar_url,
      } 
    ])
  }, [userData]);
  
  const handleUploadChange = ({fileList}) => {
    setFileList(fileList);
    setIsFileChanged(true);
  }
  
  const handleFinish = values => {
    async function fn() {
      const {avatar, gender, phone_number, email } = values;
      const formData = new FormData();
      if (isFileChanged) {
        avatar.fileList.forEach(file => {
          formData.append("avatar", file.originFileObj)
        })
      }
      formData.append("gender", gender);
      formData.append("phone_number", phone_number);
      formData.append("email", email);
      try{
        await axiosInstance.patch(`/api/users/${user_id}/`, formData, {headers})
        notification.open({
          message: "프로필을 수정했습니다!",
          description: "프로필 페이지로 이동합니다",
          icon: <SmileTwoTone />
        })
        history.push(`/accounts/profile/${user_id}`)
      }
      catch(error) {
        if (error.response) {
          notification.open({
            message: "프로필 수정에 실패했습니다",
            description: "입력하신 정보를 다시 한 번 확인해주세요",
            icon: <FrownTwoTone />
          })
          console.log("error.response: ", error.response) 
        }
      }
    }
    fn()
  }
  return(
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={userData}
    >
      <Form.Item
        label="아바타"
        name="avatar"
        help={
          <>
            <div>아바타 수정시 먼저 <DeleteOutlined />버튼으로 기존 사진을 삭제해주세요!</div>
          </>
        }
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
        >
          {fileList.length === 0 ? (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          ): null}
        </Upload>
      </Form.Item>
      <Form.Item
        label="성별"
        name="gender"
      >
        <Select
          placeholder="성별을 선택해주세요!"
          allowClear
        >
          <Option value="M">남성</Option>
          <Option value="F">여성</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="전화번호"
        name="phone_number"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="이메일"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          프로필 수정하기
        </Button>
      </Form.Item>
    </Form>
  )
}
