import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class HandyAuth extends Component {
  async addToken() {
    let dataToken = this.props.token;
    if (dataToken) {
      var token = "JWT" + this.props.token;
      axios.defaults.headers.common["Authorization"] = token;
    }
  }

  render() {
    this.addToken();
    return this.props.children;
  }
}

const mapStateProps = (appState) => ({
  token: appState.user.token,
});

export default connect(mapStateProps)(HandyAuth);
