import React, {useEffect} from "react";
import {Form, Input, Button, Select, DatePicker, notification} from "antd";

export default function ProfileEditForm({ userData }) {
  console.log(userData);
  const [form] = Form.useForm();
  const {username, avatar_url, phone_number, gender, email, birth_date} = userData;
  useEffect(() => {
    form.resetFields()
  }, [userData]);
  const onFinish = () => {
    return;
  }
  return(
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={userData}
    >
      <Form.Item
        label="아이디"
        name="username"
      >
        <Input />
      </Form.Item>
      <Form.Item>
      </Form.Item>
      <Form.Item>
      </Form.Item>
      <Form.Item>
      </Form.Item>      
    </Form>
  )
}
