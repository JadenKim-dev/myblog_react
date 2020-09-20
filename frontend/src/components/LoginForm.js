import React from "react"
import {useHistory, useLocation} from "react-router-dom";
import {Form, Input, Button, notification} from "antd";
import {SmileTwoTone, FrownTwoTone} from "@ant-design/icons";
import {useAppContext, setToken, setTreeData, setUsername} from "store"
import {axiosInstance} from "api"

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const { dispatch } = useAppContext()
  const { from: loginRedirectUrl } = location.state || {from: "/"}
  const onFinish = values => {
    async function fn() {
      const { username, password } = values
      const data = {username, password}
      try {
        const response = await axiosInstance.post("api/token/", data)
        console.log(response)
        const { data: {token: jwtToken} } = response
        dispatch(setToken(jwtToken))
        dispatch(setUsername(username))
        notification.open({
          message: "로그인 성공!",
          description: (location.state ? "페이지" : "홈으") + "로 이동합니다", 
          icon: <SmileTwoTone />
        })
        history.push(loginRedirectUrl);
      } catch(error) {
        if (error.response){
          notification.open({
            message: '로그인에 실패했습니다.',
            description: '입력하신 정보를 확인해주세요.',
            icon: <FrownTwoTone twoToneColor="tomato"/>
          })
        }
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