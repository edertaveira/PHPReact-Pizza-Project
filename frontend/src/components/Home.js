import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { API_ROOT, STORAGE_ROOT } from "../common/names";
import { Carousel, Card, List, Button, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

import "./Home.css";
import Product from "./partials/Product";

const slides = [
  {
    file: "slide-1.jpg",
    text: "Large Pizzas. Online order only.",
    subtext: "",
  },
  {
    file: "slide-2.jpg",
    text: "Large Pizzas. Online order only.",
    subtext: "",
  },
];

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    setLoading(true);
    axios.post(`${API_ROOT}/api/product/list`).then((result) => {
      setMenu(result.data);
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
      <Carousel autoplay>
        {slides.map((item, index) => {
          const backgroundImage = `url(${STORAGE_ROOT}/slide/${item.file})`;
          return (
            <div key={`slide_${index}`}>
              <div className="image-slide" style={{ backgroundImage }}>
                <h3>{item.text}</h3>
                {item.subtext && <span>{item.subtext}</span>}
              </div>
            </div>
          );
        })}
      </Carousel>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <List
          className="menu-list"
          grid={{ gutter: 16, lg: 4, md: 3, sm: 3, xs: 2 }}
          dataSource={menu}
          renderItem={(item) => (
            <List.Item>
              <Product product={item} />
            </List.Item>
          )}
        />
      </Spin>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
});
export default withRouter(connect(mapStateToProps)(Home));
