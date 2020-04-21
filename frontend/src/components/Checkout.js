import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Layout,
  Divider,
  Input,
  Form,
  Button,
  Row,
  Col,
  message,
  notification,
} from "antd";
import { FaMapMarkedAlt, FaTicketAlt } from "react-icons/fa";
import { HomeOutlined } from "@ant-design/icons";
import { cartEmptyProduct } from "../reducers/actions/cartActions";
import Cart from "./Cart";
import axios from "axios";
import { API_ROOT } from "../common/names";

const Checkout = (props) => {
  const [loading, setLoading] = useState(false);
  const [formAddress] = Form.useForm();
  const { dispatch } = props;

  useEffect(() => {}, []);

  const confirm = () => {
    formAddress.validateFields().then((values) => {
      onFinish(values);
    });
  };

  const onFinish = (values) => {
    setLoading(true);

    values.order = props.cart;
    values.costs = props.costs

    axios
      .post(API_ROOT + "/api/order/new", values)
      .then((result) => {
        if (result.data.success) {
          notification.success({
            message: "Thanks for your preference!",
            description: "Order successfully placed!",
            duration: 1000,
          });
          props.history.push("/");

          dispatch(cartEmptyProduct());
          formAddress.resetFields();

          setLoading(false);
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
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cart">
            <HomeOutlined /> Basket
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content className="content">
        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <h2>
              <FaTicketAlt /> Order Confirmation
            </h2>
            <Divider />
            <Cart getCart={true} />
            <br />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <h2>
              <FaMapMarkedAlt /> Address
            </h2>
            <Divider />
            <Form form={formAddress} name="address" layout="vertical">
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Number"
                name="number"
                rules={[{ required: true, message: "Number is required!" }]}
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

              <Form.Item label="Complement" name="complement">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button loading={loading} type="primary" onClick={confirm}>
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout.Content>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
  cart: appState.cart,
  costs: appState.setting.costs,
});
export default withRouter(connect(mapStateToProps)(Checkout));
