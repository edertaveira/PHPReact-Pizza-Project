import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { API_ROOT } from "../common/names";
import { Carousel, Card, List, Button } from "antd";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { cartAddProduct } from "../reducers/actions/cartActions";
import axios from "axios";

import "./Home.css";

const slides = [
  {
    file: "slide-1.jpg",
    text: "Large Pizzas. Online order only.",
    subtext: "",
  },
  {
    file: "slide-2.jpg",
    text: "",
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
    axios.get(`${API_ROOT}/api/product/list`).then((result) => {
      setMenu(result.data);
    });

    setMenu([
      {
        image: "banana.png",
        title: "Pizza with Banana",
        price: 19.0,
      },
      {
        image: "4cheese.png",
        title: "Pizza with Cheese",
        price: 18.0,
      },
    ]);
    //const menu = await axios.get(`${API_ROOT}/menu`);
  };

  const { dispatch } = props;

  return (
    <React.Fragment>
      <Carousel autoplay>
        {slides.map((item, index) => {
          const backgroundImage = `url(${API_ROOT}/storage/img/slide/${item.file})`;
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

      <List
        className="menu-list"
        grid={{ gutter: 16, lg: 4, md: 3, sm: 3, xs: 2 }}
        dataSource={menu}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <img
                  alt="product-image"
                  src={`${API_ROOT}/storage/img/${item.image}`}
                />
              }
              actions={[
                <Button
                  type="link"
                  onClick={() => dispatch(cartAddProduct(item))}
                  icon={<FaCartPlus />}
                />,
                <FaHeart key="favorite" />,
              ]}
            >
              <Card.Meta
                title={item.title}
                description={new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(item.price)}
              />
            </Card>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
});
export default withRouter(connect(mapStateToProps)(Home));
