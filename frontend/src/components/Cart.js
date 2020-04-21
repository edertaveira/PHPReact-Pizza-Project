import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Layout, Breadcrumb, Button, Space, Empty, List } from "antd";
import { API_ROOT, deliveryCosts } from "../common/names";
import { HomeOutlined } from "@ant-design/icons";
import "./Cart.css";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaCheck,
  FaSmile,
  FaGrinBeamSweat,
} from "react-icons/fa";
import {
  cartAddProduct,
  cartRemoveProduct,
  cartEmptyProduct,
} from "../reducers/actions/cartActions";
import Login from "./account/Login";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(false);
  const { dispatch } = props;

  useEffect(() => {
    setup();
  }, [props.cart]);

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
        return new Intl.NumberFormat(props.locale, {
          style: "currency",
          currency: props.currency,
        }).format(price * props.rate);
      },
    },
  ];
  if (!props.getCart) {
    columns.push({
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            icon={<FaPlus />}
            onClick={() => dispatch(cartAddProduct(record, props.costs))}
          />
          <Button
            type="link"
            icon={<FaMinus />}
            onClick={() => dispatch(cartRemoveProduct(record, props.costs))}
          />
        </div>
      ),
    });
  }

  const setup = () => {
    let prods = [];
    for (let key in props.cart.products) {
      if (props.cart.products[key]) prods.push(props.cart.products[key]);
    }
    setCart(prods);
  };

  const tableCart = (
    <Table
      pagination={false}
      locale={{
        emptyText: (
          <Empty
            image={<FaGrinBeamSweat />}
            imageStyle={{
              fontSize: "60px",
            }}
            description={<span>Your Basket is empty.</span>}
          >
            <Link className="ant-btn ant-btn-primary" to="/">
              Choose some pizzas! ;)
            </Link>
          </Empty>
        ),
      }}
      rowKey="product_id"
      columns={columns}
      dataSource={cart}
      footer={() => (
        <List className="totais">
          <List.Item>
            SubTotal:{" "}
            {new Intl.NumberFormat(props.locale, {
              style: "currency",
              currency: props.currency,
            }).format(props.cart.total * props.rate)}
          </List.Item>
          {cart.length > 0 && (
            <List.Item>
              Delivery Costs:{" "}
              {new Intl.NumberFormat(props.locale, {
                style: "currency",
                currency: props.currency,
              }).format(props.costs * props.rate)}
            </List.Item>
          )}
          {cart.length > 0 && (
            <List.Item>
              Total:{" "}
              {new Intl.NumberFormat(props.locale, {
                style: "currency",
                currency: props.currency,
              }).format(
                (props.cart.total + parseFloat(props.costs)) * props.rate
              )}
            </List.Item>
          )}
        </List>
      )}
    />
  );

  const onConfirm = () => {
    if (props.user && props.user.name) {
      props.history.push("checkout");
    } else {
      setVisible(true);
    }
  };

  const onClose = () => {
    props.history.push("checkout");
    setVisible(false);
  };

  if (props.getCart) {
    return tableCart;
  }

  return (
    <React.Fragment>
      <Login visible={visible} onClose={onClose} />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Basket</Breadcrumb.Item>
      </Breadcrumb>

      <Layout.Content className="content">
        {tableCart}
        <br />
        <Space style={{ float: "right" }} direction="horizontal">
          <Button
            icon={<FaTrash />}
            disabled={cart.length === 0}
            onClick={() => dispatch(cartEmptyProduct())}
          >
            Empty Cart
          </Button>
          <Button
            disabled={cart.length === 0}
            onClick={onConfirm}
            type="primary"
            icon={<FaCheck />}
          >
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
  costs: appState.setting.costs,
  rate: appState.setting.rate,
  currency: appState.setting.currency,
  locale: appState.setting.locale,
});
export default withRouter(connect(mapStateToProps)(Cart));
