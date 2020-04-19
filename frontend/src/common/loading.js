import React from "react";
import { Spin, Icon } from "antd";
import { LoadingOutlined } from "@ant-design/icons"; 

const Loading = ({ isLoading, error }) => {
  if (isLoading) {
    const loadingIcon = <LoadingOutlined />;
    return <Spin style={{ textAlign: "center", margin: "20px" }} indicator={loadingIcon} />;
  } else if (error) {
    console.error(error);
    return <div>Error loading the page</div>;
  }
  return null;
};

export default Loading;
