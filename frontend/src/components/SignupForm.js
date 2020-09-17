import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {Form, Input, Button, Select, DatePicker, notification} from "antd";
import {SmileTwoTone, FrownTwoTone} from "@ant-design/icons";
import {axiosInstance} from "api";

const {Option} = Select;

export default function SignupForm() {
  const history = useHistory()
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = values => {
    async function fn() {
      setFieldErrors({})
      const {username, password, birth_date, gender, phone_number, email } = values;
      const data = {username, password, birth_date, gender, phone_number, email: email ? email : ""}
      console.log(email);
      try{
        await axiosInstance.post("/api/users/", data)
        notification.open({
          message: "회원가입에 성공했어요!",
          description: "로그인 페이지로 이동합니다",
          icon: <SmileTwoTone />
        })
        history.push('/accounts/login')
      }
      catch(error) {
        if (error.response) {
          notification.open({
            message: "회원가입에 실패했습니다",
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
      
      <Form.Item
        label="비밀번호 재확인"
        name="confirm_password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '재확인 비밀번호를 입력해주세요!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('비밀번호를 다시 확인해주세요');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item name="birth_date" label="생년월일" rules={[{ required: true, message: "생년월일을 선택해주세요!" }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="gender" label="성별" rules={[{ required: true, message: "성별을 선택해주세요!" }]}>
        <Select
          placeholder="성별을 선택해주세요!"
          allowClear
        >
          <Option value="M">남성</Option>
          <Option value="F">여성</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        label="휴대전화"
        name="phone_number"
        rules={[{ required: true, message: '전화번호를 입력해주세요!' }]}
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
          가입하기
        </Button>
      </Form.Item>
    </Form>
  )
}

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };
