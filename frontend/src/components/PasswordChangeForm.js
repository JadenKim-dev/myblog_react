import React from "react"
import {useHistory} from "react-router-dom";
import {Form, Input, Button, notification} from "antd";
import {SmileTwoTone, FrownTwoTone} from "@ant-design/icons"
import {useAppContext} from "store";
import {axiosInstance} from "api";

export default function UserConfirmForm({user_id}) {
  const {store: {username, jwtToken}} = useAppContext()
  const history = useHistory()
  const handleFinish = values => {
    const headers = {Authorization: `JWT ${jwtToken}`}
    const {old_password, new_password} = values;
    const confirmData = {username, password: old_password}
    const newData = {password: new_password}
    async function fn() {
      try {
        const jwtToken = await axiosInstance.post("api/token/", confirmData)
        await axiosInstance.patch(`api/users/${user_id}/`, newData, {headers})
        notification.open({
          message: "비밀번호를 수정했습니다.",
          description: "홈화면으로 이동합니다.",
          icon: <SmileTwoTone />
        })
        history.push('')
      } catch(error) {
        if (error.response) {
          notification.open({
            message: "비밀번호 수정에 실패했습니다.",
            description: "입력하신 정보를 확인해주세요",
            icon: <FrownTwoTone />
          })
          console.log(error.response)
        }
      }
    }
    fn();
  }
  
  
  return (
    <Form
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label="이전 비밀번호"
        name="old_password"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="새로운 비밀번호"
        name="new_password"
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          비밀번호 바꾸기
        </Button>
      </Form.Item>
    </Form>
  )
}