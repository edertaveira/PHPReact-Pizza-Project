import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Layout, Breadcrumb, Button, Space } from "antd";
import { API_ROOT } from "../common/names";
import { HomeOutlined } from "@ant-design/icons";

import "./Cart.css";
import { FaMinus, FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import {
  cartAddProduct,
  cartRemoveProduct,
  cartEmptyProduct,
} from "../reducers/actions/cartActions";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const { dispatch } = props;

  useEffect(() => {
    setup();
  }, [props.cart]);

  const setup = () => {
    let prods = [];
    for (let key in props.cart.products) {
      if (props.cart.products[key]) prods.push(props.cart.products[key]);
    }
    setCart(prods);
  };

  const columns = [
    {
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <img
            src={`${API_ROOT}/storage/img/${image}`}
            className="cart-thumb"
          />
        );
      },
    },
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (item, record) => {
        return (
          props.cart.products[record.product_id] &&
          props.cart.products[record.product_id].amount
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(price);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            icon={<FaPlus />}
            onClick={() => dispatch(cartAddProduct(record))}
          />
          <Button
            type="link"
            icon={<FaMinus />}
            onClick={() => dispatch(cartRemoveProduct(record))}
          />
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Cart</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content className="content">
        <Table
          rowKey="product_id"
          columns={columns}
          dataSource={cart}
          footer={() =>
            `Total: ${new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(props.cart.total)}`
          }
        />
        <br />
        <Space style={{ float: "right" }} direction="horizontal">
          <Button
            icon={<FaTrash />}
            onClick={() => dispatch(cartEmptyProduct())}
          >
            Empty Cart
          </Button>
          <Button type="primary" icon={<FaCheck />}>
            {" "}
            Checkout
          </Button>
        </Space>
        <br />
      </Layout.Content>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
  cart: appState.cart,
});
export default withRouter(connect(mapStateToProps)(Cart));
