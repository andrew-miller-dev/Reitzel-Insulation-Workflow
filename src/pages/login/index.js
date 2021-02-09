import React from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";
import { getLogin, reqWeather } from "../../api/index";
const { Item } = Form;
export default function Login(props) {
  const handleSubmit = async (values) => {
    const { loginId, loginPwd } = values;
    const result = await getLogin(loginId, loginPwd);
    reqWeather("calgary");
    if (result.data.status === 1) {
      props.history.replace("/");
      message.success("Login Success!");
    } else {
      message.info("Username or Password not correct!");
    }
  };

  return (
    <div className="login_page">
      <div className="login">
        <h2>Login</h2>
        <Form onFinish={handleSubmit} autoComplete="off">
          <Item
            name="loginId"
            rules={[
              {
                required: true,
                message: "Cannot be Emptry!",
              },
            ]}
          >
            <Input
              style={{ backgroundColor: "transparent" }}
              prefix={<UserOutlined />}
              placeholder="username"
            />
          </Item>
          <Item
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "Cannot be Empty",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="password" />
          </Item>
          <Item className="login_button">
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              block
            >
              Login
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}
