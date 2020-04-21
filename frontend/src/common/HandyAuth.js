import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { costsUpdate } from "../reducers/actions/settingActions";
import { API_ROOT } from "../common/names";

const HandyAuth = (props) => {
  useEffect(() => {
    addToken();
    setupCosts();
  }, []);

  const setupCosts = () => {
    axios.post(API_ROOT + "/api/setting/get").then((result) => {
      if (result.data.success) {
        props.costsUpdate(result.data.setting.costs);
      }
    });
  };

  const addToken = async () => {
    let dataToken = props.token;
    if (dataToken) {
      var token = "Bearer " + props.token;
      axios.defaults.headers.common["Authorization"] = token;
    }
  };

  return props.children;
};

const mapStateProps = (appState) => ({
  token: appState.user.token,
});

export default connect(mapStateProps, { costsUpdate })(HandyAuth);
