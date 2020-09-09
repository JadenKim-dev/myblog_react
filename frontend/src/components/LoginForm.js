import React from "react"
import {useHistory} from "react-router-dom";
import {Form, Input, Button, notification} from "antd";
import {SmileTwoTone, FrownTwoTone} from "@ant-design/icons";
import {useAppContext, setToken} from "store"
import {axiosInstance} from "api"

export default function Login() {
  const history = useHistory();
  const { dispatch } = useAppContext()
  const onFinish = values => {
    async function fn() {
      const { username, password } = values
      const data = {username, password}
      try {
        const response = await axiosInstance.post("accounts/token/", data)
        console.log(response)
        const { data: {token: jwtToken} } = response
        dispatch(setToken(jwtToken))
        notification.open({
          title: "로그인 성공!",
          description: "홈 화면으로 이동합니다",
          icon: <SmileTwoTone />
        })
        history.push("/")
      } catch(error) {
        console.error(error)
      }      
    }
    fn()
  }
  
  return (
   <Form
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="아이디"
        name="username"
        rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          로그인하기
        </Button>
      </Form.Item>
    </Form>
  )
}