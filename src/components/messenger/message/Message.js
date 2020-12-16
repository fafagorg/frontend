import React from "react";
import "./Message.css";

export default class Message extends React.Component {
  constructor(props) {
    super(props);

    this.user = 1;
  }

  render() {
    return (
      <>
        <li class={this.user === this.props.data.userId ? "sent" : "replies"}>
          <img src={this.props.data.image} alt="" />
          <p>{this.props.data.content}</p>
        </li>
      </>
    );
  }
}
