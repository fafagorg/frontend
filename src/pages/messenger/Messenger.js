import React from "react";
import { Link } from "react-router-dom";
import "./Messenger.css";
import { io } from "socket.io-client";
import Message from "../../components/messenger/message/Message";
import Room from "../../components/messenger/room/Room";
import * as MessengerServices from "../../services/messenger";
import * as ClientService from "../../services/client";

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);

    this.roomId = window.location.pathname.replace('/chat', '').replace('/', '') || undefined
    // forbidden if is not your user
    if (this.roomId !== undefined && this.roomId.split('-')[0] !== ClientService.getJWT().data.userId) {
      window.location.href = "/chat";
    }

    this.state = { selectedRoomId: this.roomId, rooms: undefined, message: undefined };
    this.content = undefined

    this.websocket = this.websocket.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
  }

  async componentDidMount() {
    await this.getRooms();
    this.websocket();

    // scroll bottom
    document.getElementById("messages").scrollTop = 10000000000;
  }

  websocket() {
    this.socket = io(
      process.env.REACT_APP_ENDPOINT_SOCKET_MESSENGER + "/chat",
      {
        forceNew: false,
        transports: ["websocket"],
        query: {
          token: ClientService.getJWT().token,
        },
      }
    );

    this.socket.on("private_message", (data) => {
      let message = this.state.message;
      if (this.state.selectedRoomId === data.roomId) {
        // add message
        if (Object.keys(this.state.message).length === 0) this.getMessage(data.roomId)
        message.messages.push({
          content: data.content,
          userId: data.userId,
          image: data.image,
        });

        // new message to false
        let room = this.state.rooms.find((x) => x.roomId === data.roomId);
        room.newMessage = false;

        this.setState({ message: message, rooms: this.state.rooms });
      } else {
        // new message to true
        let room = this.state.rooms.find((x) => x.roomId === data.roomId);
        room.newMessage = true;

        this.setState({ rooms: this.state.rooms });
      }
    });
  }

  async getRooms() {
    try {
      let rooms = await MessengerServices.getRooms();
      rooms.map((x) => (x.newMessage = false));
      this.setState({ rooms: rooms });

      // if exist room, get the once
      if (rooms.length > 0) {
        await this.getMessage(rooms[0].roomId);
        // select once room if I access by /chat url
        if (this.state.selectedRoomId === undefined) this.setState({selectedRoomId: rooms[0].roomId})
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  async getMessage(roomId) {
    try {
      let message = await MessengerServices.getMessages(roomId);
      this.setState({ message: message });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    this.content = event.target.value;
  }

  async sendMessage() {
    // not undefined content
    if(this.content === undefined || this.content === "") return;

    this.socket.emit("send_message", {
      userId: this.state.selectedRoomId.split('-')[1],
      content: this.content,
      roomId: this.state.selectedRoomId,
    });
    
    // print message
    if (this.state.message !== undefined) {
      this.state.message.messages.push({
        content: this.content,
        userId: this.state.selectedRoomId.split('-')[1],
        images: null,
      })
      this.setState({message: this.state.message})
    }
    // new conversation
    if (this.state.message === undefined) await this.getRooms();

    // update last message
    let room = this.state.rooms.find((x) => x.roomId === this.state.selectedRoomId);
    room.lastMessage = this.content;
    this.setState({ rooms: this.state.rooms });

    // scroll bottom
    document.getElementById("messages").scrollTop = 10000000000;
  }

  async changeRoom(roomId) {
    await this.getMessage(roomId);
    this.setState({selectedRoomId: roomId})

    // scroll bottom
    document.getElementById("messages").scrollTop = 10000000000;
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet prefetch"
          href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
        {this.state.selectedRoomId !== undefined ?
          <div id="frame">
            <div id="sidepanel">
              <div id="bottom-bar">
                <button>
                  <i class="far fa-newspaper"></i>{" "}
                  <span>
                    <Link class="link" to="/">
                      Ver productos
                    </Link>
                  </span>
                </button>
              </div>
              <div id="contacts">
                <ul>
                  {this.state.rooms !== undefined &&
                    this.state.message !== undefined &&
                    this.state.rooms.map((data, i) => (
                      <Room
                        selectedRoomId={
                          data.roomId === this.state.selectedRoomId
                            ? "selected "
                            : ""
                        }
                        data={data}
                        key={i}
                        changeRoom={this.changeRoom}
                      />
                    ))}
                </ul>
              </div>
            </div>
            <div class="content">
              <div class="contact-profile">
                {this.state.message !== undefined && (
                  <>
                    <img src={this.state.message.user.image} alt="" />
                    <p>{this.state.message.user.name}</p>
                  </>
                )}
              </div>
              <div class="messages" id="messages">
                <ul>
                  {this.state.message !== undefined &&
                    this.state.message.messages.map((data, i) => (
                      <Message data={data} key={i} />
                    ))}
                </ul>
              </div>
              <div class="message-input">
                <div class="wrap">
                  <input
                    type="text"
                    placeholder="Write your message..."
                    onChange={this.handleChange}
                  />
                  <button class="submit" onClick={() => this.sendMessage()}>
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        : <div id="messages">No tienes ningun chat</div>
        }
      </>
    );
  }
}
