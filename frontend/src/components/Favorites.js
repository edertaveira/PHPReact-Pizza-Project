import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Table,
  Layout,
  Breadcrumb,
  message,
  Card,
  Button,
  Spin,
  List,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_ROOT, STORAGE_ROOT } from "../common/names";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { cartAddProduct } from "../reducers/actions/cartActions";
import Product from "./partials/Product";
import { LoadingOutlined } from "@ant-design/icons";
import Login from "./account/Login";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    update();
  }, [props.favorite]);

  const update = () => {
    setFavorites(props.favorite.products);
  };

  const setup = () => {
    setLoading(true);
    axios
      .post(`${API_ROOT}/api/favorite/list`)
      .then((result) => {
        if (result.data.success) {
          setFavorites(result.data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status) {
          message.info(error.response.data.message);
          props.history.push("/");
        }
      });
  };

  const openLogin = () => {
    props.history.push("/");
    setVisible(true);
  };

  return (
    <React.Fragment>
      <Login onClose={() => setVisible(false)} visible={visible} />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Favorites</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Layout.Content className="content">
          <List
            className="menu-list"
            grid={{ gutter: 16, lg: 4, md: 3, sm: 3, xs: 2 }}
            dataSource={favorites}
            renderItem={(item) => (
              <List.Item>
                <Product product={item} openLogin={openLogin} />
              </List.Item>
            )}
          />
        </Layout.Content>
      </Spin>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
  cart: appState.cart,
  favorite: appState.favorite,
});
export default withRouter(connect(mapStateToProps)(Favorites));
