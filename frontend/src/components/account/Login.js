import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Tabs } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { API_ROOT } from "../../common/names";
import { userLoggedInAction } from "../../reducers/actions/userActions";
import { allFavorite } from "../../reducers/actions/favoriteActions";
import "./Login.css";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Login");
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();

  const register = (
    <Form form={formRegister} name="register" layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email required!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Password Confirm"
        name="c_password"
        rules={[{ required: true, message: "Confirm Password is required!" }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );

  const login = (
    <Form form={formLogin} name="login" layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email required!" },
          { type: "email", message: "Invalid Email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required!" }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );

  const getFavorites = () => {
    axios.post(API_ROOT + "/api/favorite/list").then((result) => {
      if (result.data.success) {
        const ids = result.data.products.map(item => item.product_id);
        props.dispatch(allFavorite(ids));
      }
    });
  };

  const onFinishLogin = (values) => {
    setLoading(true);
    axios
      .post(API_ROOT + "/api/auth/login", values)
      .then((result) => {
        if (result.data.user) {
          let { user, token } = result.data;
          let action = userLoggedInAction(user, token);
          props.dispatch(action);
          props.onClose();
          /** Getting all favorites preously added */
          getFavorites();

          formLogin.resetFields();
          setLoading(false);

          message.success("Welcome! :) ");
        } else {
          message.error(result.data.error);
          setLoading(false);
        }
      })
      .catch((e) => {
        message.error("Something wrong. Please try again.");
        setLoading(false);
      });
  };

  const onFinishRegister = (values) => {
    setLoading(true);
    axios
      .post(API_ROOT + "/api/user/register", values)
      .then((result) => {
        if (result.data.success) {
          let { user, token } = result.data;
          let action = userLoggedInAction(user, token);
          props.dispatch(action);
          props.onClose();

          formLogin.resetFields();
          setLoading(false);

          message.success("Welcome! :) ");
        } else {
          message.error(result.data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        message.error("Something wrong. Please try again.");
        setLoading(false);
      });
  };

  const changeTab = (key) => {
    setTitle(key);
  };

  return (
    <Modal
      visible={props.visible}
      title={title}
      okText={title}
      cancelText="Cancel"
      onCancel={props.onClose}
      confirmLoading={loading}
      onOk={() => {
        if (title === "Login") {
          formLogin.validateFields().then((values) => {
            onFinishLogin(values);
          });
        } else {
          formRegister.validateFields().then((values) => {
            onFinishRegister(values);
          });
        }
      }}
    >
      <Tabs defaultActiveKey="login" onChange={changeTab}>
        <Tabs.TabPane tab="Login" key="Login">
          {login}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Register" key="Register">
          {register}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default withRouter(connect()(Login));
