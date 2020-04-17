import React from "react";
import { Spin, Icon } from "antd";

const Loading = ({ isLoading, error }) => {
  if (isLoading) {
    const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    /* Better loading */
    return <Spin indicator={loadingIcon} />;
  } else if (error) {
    console.error(error);
    return <div>Error loading the page</div>;
  }

  return null;
};

export default loading;
