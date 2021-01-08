import React from "react";
import "./Message.css";
import * as ClientService from "../../../services/client";

export default class Message extends React.Component {
  render() {
    return (
      <>
        <li class={ClientService.getJWT().data.userId === this.props.data.userId ? "sent" : "replies"}>
          <p>{this.props.data.content}</p>
        </li>
      </>
    );
  }
}
