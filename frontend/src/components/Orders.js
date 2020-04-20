import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Layout, Breadcrumb, message } from "antd";
import { API_ROOT } from "../common/names";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";

import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaCheck,
  FaSmile,
  FaGrinBeamSweat,
} from "react-icons/fa";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    setLoading(true);
    axios.post(`${API_ROOT}/api/order/list`).then((result) => {
      if (result.data.success) {
        setOrders(result.data.orders);
      }
      setLoading(false);
    }).catch(error => {
      if (error.response.status)  {
        message.info(error.response.data.message)
        props.history.push("/");
      }
    });
  };
  const columns = [
    {
      title: "#",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => created_at,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (price) => {
        return new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(price);
      },
    },
  ];

  const tableOrder = (
    <Table
      loading={loading}
      pagination={true}
      rowKey="order_id"
      columns={columns}
      dataSource={orders}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            size="small"
            pagination={false}
            rowKey="product_id"
            columns={[
              {
                title: "Product",
                dataIndex: "title",
                key: "title",
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
                title: "Amount",
                dataIndex: "amount",
                key: "amount",
                render: (amount, record) => record.pivot.amount,
              },
              {
                title: "Total",
                dataIndex: "total",
                key: "total",
                render: (price, record) => {
                  return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(record.pivot.price);
                },
              },
            ]}
            dataSource={record.products}
          />
        ),
        rowExpandable: (record) => record.products,
      }}
    />
  );

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content className="content">{tableOrder}</Layout.Content>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
  cart: appState.cart,
});
export default withRouter(connect(mapStateToProps)(Orders));
