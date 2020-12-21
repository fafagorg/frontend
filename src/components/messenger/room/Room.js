import React from "react";
import "./Room.css";

export default class Room extends React.Component {
  render() {
    return (
      <li
        class={this.props.selectedRoomId + "contact"}
      >
        <div class="wrap" onClick={() => this.props.changeRoom(this.props.data.roomId)}>
          <span
            class={
              this.props.data.newMessage
                ? "contact-status new_message"
                : "contact-status"
            }
          ></span>
          <div class="meta">
            <p class="name">{this.props.data.roomName}</p>
            <p class="preview">{this.props.data.lastMessage}</p>
          </div>
        </div>
        <i class="fa far fa-trash-alt" id="remove" aria-hidden="true" onClick={() => this.props.deleteRoom(this.props.data.roomId)}></i>
        <i class="fa far fa-pencil" id="remove" aria-hidden="true" onClick={() => this.props.modifyRoomName(this.props.data.roomId)}></i>
      </li>
    );
  }
}
