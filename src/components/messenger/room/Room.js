import React from "react";
import "./Room.css";

export default class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li
        class={this.props.selectedRoomId + "contact"}
        onClick={() => this.props.changeRoom(this.props.data.roomId)}
      >
        <div class="wrap">
          <span
            class={
              this.props.data.newMessage
                ? "contact-status new_message"
                : "contact-status"
            }
          ></span>
          <img src={this.props.data.user.image} alt="" />
          <div class="meta">
            <p class="name">{this.props.data.roomId}</p>
            <p class="preview">{this.props.data.lastMessage}</p>
          </div>
        </div>
      </li>
    );
  }
}
