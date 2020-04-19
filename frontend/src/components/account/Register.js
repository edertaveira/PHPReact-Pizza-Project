import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message,
  Divider,
} from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { API_ROOT } from "../../common/names";
import { userLoggedInAction } from "../../reducers/actions/userActions";
import "./Login.css";
import { FaPizzaSlice } from "react-icons/fa";

const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post(API_ROOT + "/user/register", values)
      .then((result) => {
        if (result.data.success) {
          let { user, token } = result.data;
          let action = userLoggedInAction(user, token);
          props.dispatch(action);
          //props.history.push("dashboard");
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

  return (
    <Row>
      <Col
        lg={{ span: 10, offset: 7 }}
        md={{ span: 10, offset: 7 }}
        sm={{ span: 16, offset: 4 }}
      >
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* <img className="logo" src="/images/logo.png" /> */}
          <div className="logo-login">
            <FaPizzaSlice /> <span>Pizza Club</span>
          </div>
          <Divider />

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
            name="password_confirm"
            rules={[
              { required: true, message: "Confirm Password is required!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Divider />

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="District"
            name="district"
            rules={[{ required: true, message: "District is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Complement"
            name="complement"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
});
export default withRouter(connect(mapStateToProps)(Register));
