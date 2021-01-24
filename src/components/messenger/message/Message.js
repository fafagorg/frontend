import React from "react";
import "./Message.css";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { withHistory } from "../../../components/navigation/history";

class Message extends React.Component {
  render() {
    return (
      <>
        <li class={this.props.dataa.username === this.props.data.user.username ? "sent" : "replies"}>
          <p>{this.props.data.content}</p>
        </li>
      </>
    );
  }
}

function stateToProps(state) {
  return {
    token: state.userToken,
    data: jwt.decode(state.userToken),
  }
}
export default connect(stateToProps)(withHistory(Message));